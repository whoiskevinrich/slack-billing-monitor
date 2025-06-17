import { mockClient } from 'aws-sdk-client-mock';
import { CostExplorerClient, GetCostAndUsageCommand } from '@aws-sdk/client-cost-explorer';
import { sampleCostExplorerResponse, sampleCostExplorerDateRange } from './AwsCostExplorerService.sampledata';
import { AwsCostExplorerService } from './AwsCostExplorerService';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockCostExplorer = mockClient(CostExplorerClient);
mockCostExplorer.on(GetCostAndUsageCommand).resolves(sampleCostExplorerResponse);

describe('getCostAndUsage', () => { 
    it('should send GetCostAndUsageCommand', async () => {
        const start = sampleCostExplorerDateRange.at(0)!;
        const end = sampleCostExplorerDateRange.at(-1)!;
        
        const wrapper = new AwsCostExplorerService(mockCostExplorer as any as CostExplorerClient);
        
        await wrapper.getCostAndUsage(start, end);
        
        expect(mockCostExplorer.commandCalls(GetCostAndUsageCommand).length).toBe(1);
    });
});