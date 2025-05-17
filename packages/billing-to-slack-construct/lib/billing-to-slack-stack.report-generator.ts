import { Context, EventBridgeEvent } from 'aws-lambda';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns'
import { getCostAndUsage } from '@src/services/aws/cost-explorer/cost-explorer-wrapper';
import { buildLookbackRange } from '@src/time/buildLookbackRange';
import { buildReport } from '@src/services/CostAndUsageReports/CostAndUsageReportBuilder';
import { ReportLine } from '@src/services/CostAndUsageReports/ReportDetail';
import { ChatbotMessage, ChatbotMessageBuilder } from '@src/services/aws/chatbot/ChatbotMessageBuilder';
import { padString } from '@src/helpers/strings';
import { currencyFormatter } from '@src/formatters/currencyFormatter';


export async function handler(event: EventBridgeEvent<string, void>, context: Context): Promise<ChatbotMessage> {
    console.log({ event });

    const accountId = context.invokedFunctionArn.split(':')[4];

    const dateRange = buildLookbackRange();

    const costAndUsageResults = await getCostAndUsage(dateRange[0], dateRange.at(-1)!);
    if(!costAndUsageResults) { throw new Error('No cost and usage results')};

    const report = await buildReport({
        dates: dateRange, 
        costAndUsageResults,
        costAggregation: 'BlendedCost',
        groupBy: 'SERVICE'
    });

    const chatbotMessage = new ChatbotMessageBuilder(`Yesterday's cost was ${currencyFormatter.format(report.totalCost)}`)
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

    const command = new PublishCommand({
        Message: JSON.stringify(chatbotMessage, null, 2),
        TopicArn: process.env.SNS_TOPIC_ARN
    });

    const client = new SNSClient({});
    await client.send(command);

    return Promise.resolve(chatbotMessage);
}