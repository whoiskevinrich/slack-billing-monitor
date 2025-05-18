import { mockClient } from 'aws-sdk-client-mock';
import { CostExplorerClient, GetCostAndUsageCommand } from '@aws-sdk/client-cost-explorer';
import { sampleCostExplorerResponse, sampleCostExplorerDateRange } from './cost-explorer-wrapper.sampledata';
import { getCostAndUsage } from './cost-explorer-wrapper';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockCostExplorer = mockClient(CostExplorerClient);
mockCostExplorer.on(GetCostAndUsageCommand).resolves(sampleCostExplorerResponse);

describe('getCostAndUsage', () => { 
    it('should send GetCostAndUsageCommand', async () => {
        const start = sampleCostExplorerDateRange.at(0)!;
        const end = sampleCostExplorerDateRange.at(-1)!;
        
        await getCostAndUsage(start, end);
        
        expect(mockCostExplorer.commandCalls(GetCostAndUsageCommand).length).toBe(1);
    });
});