import { ResultByTime } from '@aws-sdk/client-cost-explorer';
import { env } from 'process';
import { groupBy } from '@src/helpers/arrays';
import { CostPerDayPerKey } from '@packages/billing-to-slack-construct/lib/CostPerDayPerKey';
import { Report } from '@src/services/CostAndUsageReports/Report';
import { ReportDetailItem } from '@src/services/CostAndUsageReports/ReportDetail';

export interface buildReportArgs {
    dates: Date[];
    costAndUsageResults: ResultByTime[];
    costAggregation?: string;
    groupBy?: string;
}

export async function buildReport(args: buildReportArgs): Promise<Report> {
    if (args.dates.length === 0) throw new Error('No dates provided');
    if (args.costAndUsageResults.length === 0) throw new Error('No cost and usage results provided');

    args.costAggregation ??= env.COST_AGGREGATION ?? 'BlendedCost';
    args.groupBy ??= env.GROUP_BY ?? 'SERVICE';

    let dailyCostsPerGrouping: CostPerDayPerKey[] = new Array<CostPerDayPerKey>();

    const report = new Report('Cost and Usage Report', args.groupBy);

    // flatten results
    for (const day of args.costAndUsageResults) {
        for (const group of day.Groups!) {
            // key => Service / Account /... /grouping
            let key = group.Keys![0];

            let costStr = group.Metrics![args.costAggregation]['Amount'];
            let cost = parseFloat(costStr ?? '0.0');

            const entry = new CostPerDayPerKey({
                key,
                cost,
                date: day.TimePeriod!.Start!,
            });
            dailyCostsPerGrouping.push(entry);

        }
    }

    // group results by key
    const groupsByKey = groupBy(dailyCostsPerGrouping, (item) => item.key);

    // build sparkline & delta --untested--
    for (const key of Object.keys(groupsByKey)) {
        const costHistory = groupsByKey[key].map((item) => item.cost);
        report.details.push(new ReportDetailItem(key, costHistory));
    }

    return report;
}