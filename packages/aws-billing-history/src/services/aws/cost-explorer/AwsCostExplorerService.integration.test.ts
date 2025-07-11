import { CostExplorerClient } from "@aws-sdk/client-cost-explorer";
import { AwsCostExplorerService } from "./AwsCostExplorerService";
import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(() => {
    try {
        new CostExplorerClient({});
    } catch (error) {
        console.error("⛔ Failed to create CostExplorerClient, check if you're logged in");
    };
});

describe.skip('Cost Explorer Wrapper Integration Test', () => {
    it('should sucessfully query AWS', async () => {
        const to = new Date();
        const from = new Date(to.getTime() - 7 * 24 * 60 * 60 * 1000);

        const client = new CostExplorerClient();
        const wrapper = new AwsCostExplorerService(client);
        const result = await wrapper.getCostAndUsage(from, to);

        expect(result).toBeDefined();
        expect(result).toHaveProperty('$metadata.httpStatusCode', 200);
        expect(result).toHaveProperty('GroupDefinitions');
        expect(result).toHaveProperty('ResultsByTime');
    })
});