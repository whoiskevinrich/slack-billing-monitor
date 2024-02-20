import { CostExplorerClient } from "@aws-sdk/client-cost-explorer";
import { getCostAndUsage } from "./cost-explorer-wrapper";

beforeAll(() => {
    try {
        new CostExplorerClient({});
    } catch (error) {
        console.error("⛔ Failed to create CostExplorerClient, check if you're logged in");
    };
});

xdescribe('Cost Explorer Wrapper Integration Test', () => {
    it('should sucessfully query AWS', async () => {
        const to = new Date();
        const from = new Date(to.getTime() - 7 * 24 * 60 * 60 * 1000);

        const result = await getCostAndUsage(from, to);

        expect(result).toBeDefined();
        expect(result).toHaveProperty('$metadata.httpStatusCode', 200);
        expect(result).toHaveProperty('GroupDefinitions');
        expect(result).toHaveProperty('ResultsByTime');
    })
});