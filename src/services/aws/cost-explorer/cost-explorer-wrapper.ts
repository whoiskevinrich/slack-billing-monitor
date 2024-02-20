import { CostExplorerClient, GetCostAndUsageCommand, GetCostAndUsageCommandInput, Granularity } from "@aws-sdk/client-cost-explorer";

const client = new CostExplorerClient({});

export async function getCostAndUsage(start: Date, end: Date) {
    const startDate = start.toISOString().split('T')[0];
    const endDate = end.toISOString().split('T')[0];

    console.debug({ info: 'start / end strings', startDate, endDate });

    const params: GetCostAndUsageCommandInput = {
        Granularity: Granularity.DAILY,
        TimePeriod: {
            Start: startDate,
            End: endDate
        },
        Filter: {
            Not: {
                Dimensions: {
                    Key: "RECORD_TYPE",
                    Values: ["Credit", "Refund", "Upfront", "Support"]
                }
            }
        },
        Metrics: [
            "BlendedCost"
        ],
        GroupBy: [
            {
                Key: "SERVICE",
                Type: "DIMENSION"
            }
        ]
    };

    const command = new GetCostAndUsageCommand(params);

    const response = await client.send(command);

    console.debug({ info: 'GetCostAndUsage Result', result: response });
    console.debug({ info: 'GetCostAndUsage Result', result: JSON.stringify(response, null, 2) });
    return response.ResultsByTime;
}