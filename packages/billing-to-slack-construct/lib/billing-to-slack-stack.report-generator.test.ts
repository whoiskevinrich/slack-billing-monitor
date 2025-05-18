import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { EventBridgeEvent } from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { handler } from './billing-to-slack-stack.report-generator';
import { sampleCostExplorerDateRange, sampleCostExplorerResponse } from '@src/services/aws/cost-explorer/cost-explorer-wrapper.sampledata';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@src/time/buildLookbackRange', () => ({
    buildLookbackRange: vi.fn(() => sampleCostExplorerDateRange)
}));

vi.mock('./cost-explorer-wrapper', () => ({
    getCostAndUsage: vi.fn(() => sampleCostExplorerResponse)
}));


describe('handler', () => {
    const mockSns = mockClient(SNSClient);
    mockSns.on(PublishCommand).resolves({
        MessageId: '0'
    });

    const mockGetCostAndUsage = vi.fn();
    mockGetCostAndUsage.mockReturnValue(sampleCostExplorerResponse);

    beforeEach(() => {
        vi.useFakeTimers()
            .setSystemTime(new Date('2024-02-07T00:00:00Z'));
    });

    afterEach(() => {
        mockSns.reset();
    });

    it('should send and SNS message', async () => {
        const event = mockEventGenerator();
        const mockContext = {
            invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:my-function'
        } as any;
    
        await handler(event, mockContext);
    
        // Vitest-compatible assertion for number of PublishCommand calls
        expect(mockSns.commandCalls(PublishCommand).length).toBe(1);
    });
});

function mockEventGenerator(): EventBridgeEvent<string, void> {
    return {
        version: '0',
        id: '0',
        'detail-type': '0',
        source: '0',
        account: '0',
        time: '0',
        region: '0',
        resources: [],
        detail: undefined
    };
}