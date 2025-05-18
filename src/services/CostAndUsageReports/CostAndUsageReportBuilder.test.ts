import { ResultByTime } from "@aws-sdk/client-cost-explorer";
import { buildReport } from "./CostAndUsageReportBuilder";
import { sampleCostExplorerResponse, sampleCostExplorerDateRange } from "@src/services/aws/cost-explorer/cost-explorer-wrapper.sampledata";
import { Report } from "@src/services/CostAndUsageReports/Report";
import { describe, beforeAll, it, expect } from "vitest";

describe('buildReport', () => {

    let sampleResults: Report;

    beforeAll(async () => {
        const dates = [new Date('2024-02-07T00:00:00Z')];
        const costAndUsageResults = sampleCostExplorerResponse.ResultsByTime!;
        sampleResults = await buildReport({
            dates, 
            costAndUsageResults,
            costAggregation: 'BlendedCost',
            groupBy: 'SERVICE'
        });
    });

    it('should throw an error if no dates are provided', async () => {
        const dates: Date[] = [];
        const costAndUsageResults: ResultByTime[] = [];
        await expect(buildReport({dates, costAndUsageResults})).rejects.toThrow('No dates provided');
    });

    it('should be defined', async () => {
        expect(sampleResults).toBeDefined();
    });

    it('should have a summary', async () => {
        expect(sampleResults.summary).toBeDefined();
    });

    it('should build a report with a header detail', async () => {
        expect(sampleResults.details.length).toBeGreaterThan(0);
        expect(sampleResults.details[0].descriptionColumn).toContain('SERVICE');
        expect(sampleResults.details[0].descriptionColumn).toContain('Last 7 days');
        expect(sampleResults.details[0].descriptionColumn).toContain('Yesterday');
    });

    it('should build a sparkline', async () => {
        const expected = '▂▃▅▆▃▇▆';
        const expectedKey = 'AWS CloudTrail';

        const cloudTrailResults = sampleResults.details.filter((detail) => detail.descriptionColumn.includes(expectedKey));
        expect(cloudTrailResults[0].sparklineColumn).toEqual(expected);
    });
});