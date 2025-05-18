import { Context, EventBridgeEvent } from 'aws-lambda';
import { buildLookbackRange } from '@src/time/buildLookbackRange';
import { buildReport } from '@src/services/CostAndUsageReports/CostAndUsageReportBuilder';
import { ReportLine } from '@src/services/CostAndUsageReports/ReportDetail';
import { ChatbotMessage, ChatbotMessageBuilder } from '@src/services/aws/chatbot/ChatbotMessageBuilder';
import { padString } from '@src/helpers/strings';
import { FakeNotificationService, INotificationService, SlackNotificationService } from '@src/services/notification';
import { Formatter } from '@src/formatters/Formatter';
import { ICostExplorerService } from '@src/services/aws/cost-explorer/ICostExplorerService';
import { FakeCostExplorerService } from '@src/services/aws/cost-explorer/FakeCostExplorerService';
import { AwsCostExplorerService } from '@src/services/aws/cost-explorer/AwsCostExplorerService';
import { CostExplorerClient } from '@aws-sdk/client-cost-explorer';

let notificationService: INotificationService;
let costFetcher: ICostExplorerService;

// Helper to safely interpret env vars as booleans
function isTrue(value?: string): boolean {
    return value?.toLowerCase() === 'true';
}

export async function handler(
    event: EventBridgeEvent<string, void>,
    context: Context,
): Promise<ChatbotMessage> {
    console.log({ event });

    initializeServices(
        isTrue(process.env.USE_FAKE_NOTIFICATION_SERVICE),
        isTrue(process.env.USE_FAKE_COST_EXPLORER_SERVICE)
    );

    const accountId = context.invokedFunctionArn.split(':')[4];
    const dateRange = buildLookbackRange();
    const startDate = dateRange[0]; // Date object
    const endDate = dateRange.at(-1)!; // Date object

    // Use the abstraction
    const costAndUsageResults = await costFetcher.getCostAndUsage(startDate, endDate);
    if(!costAndUsageResults) { throw new Error('No cost and usage results')};

    const report = await buildReport({
        dates: dateRange, 
        costAndUsageResults,
        costAggregation: 'BlendedCost',
        groupBy: 'SERVICE'
    });

    const chatbotMessage = new ChatbotMessageBuilder(`Yesterday's cost was ${Formatter.currencyFormat(report.totalCost)}`)
        .build();

    chatbotMessage.content.description += '\n```\n'
    report.details.forEach((line: ReportLine) => {
        const paddedDescription = padString(line.descriptionColumn, 35);
        const paddedCost = padString(line.yesterdayCostColumn, 10);
        const paddedPercentChange = padString(line.percentChangeColumn, 5);
        const paddedSparkline = padString(line.sparklineColumn, 10);
        chatbotMessage.content.description += `${paddedDescription}\t${paddedCost}\t${paddedPercentChange}\t${paddedSparkline}\n`;
    });
    chatbotMessage.content.description += '\n```'

    console.log({ chatbotMessage });

    await notificationService.send(
        JSON.stringify(chatbotMessage, null, 2),
        "AWS Billing Report"
    );

    return chatbotMessage;
}

function initializeServices(useFakeNotificationService: boolean, useFakeCostExplorerService: boolean): void {

    
    notificationService = notificationService ?? useFakeNotificationService
        ? new FakeNotificationService()
        : new SlackNotificationService(
            process.env.SLACK_WEBHOOK_URL!
        );

    costFetcher = notificationService ?? useFakeCostExplorerService
        ? new FakeCostExplorerService()
        : new AwsCostExplorerService(
            new CostExplorerClient()
        );
}