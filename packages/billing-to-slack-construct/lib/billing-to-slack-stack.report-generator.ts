import { EventBridgeEvent } from 'aws-lambda';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns'
import { getCostAndUsage } from '../../../src/services/aws/cost-explorer-wrapper';
import { buildLookbackRange } from '@src/time/buildLookbackRange';
import { buildReport } from '@src/services/CostAndUsageReports/CostAndUsageReportBuilder';
import { ReportLine } from '../../../src/services/CostAndUsageReports/ReportDetail';

interface ISlackSnsMessage {
    version: string;
    source: string;
    content: {
        description: string;
    }
}

export async function handler(event: EventBridgeEvent<string, void>): Promise<ISlackSnsMessage> {
    console.log({ event });

    const result = {
        version: "1.0",
        source: "custom",
        content: {
            title: "AWS Costbot",
            description: ""
        }
    }

    const dateRange = buildLookbackRange();
    const costAndUsageResults = await getCostAndUsage(dateRange[0], dateRange.at(-1)!);

    if(!costAndUsageResults) { throw new Error('No cost and usage results')};

    const report = await buildReport({
        dates: dateRange, 
        costAndUsageResults,
        costAggregation: 'BlendedCost',
        groupBy: 'SERVICE'
    });

    report.details.forEach((line: ReportLine) => {
        result.content.description += `${line.descriptionColumn}\t${line.yesterdayCostColumn}\t${line.percentChangeColumn}\t${line.sparklineColumn}\n`;
    });

    console.log({ result });

    const command = new PublishCommand({
        Message: JSON.stringify(result, null, 2),
        TopicArn: process.env.SNS_TOPIC_ARN
    });

    const client = new SNSClient({});
    await client.send(command);

    return Promise.resolve(result);
}