import { EventBridgeEvent } from 'aws-lambda';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handler } from './billing-to-slack-stack.report-generator';
import { sampleCostExplorerDateRange, sampleCostExplorerResponse } from '@src/services/aws/cost-explorer/AwsCostExplorerService.sampledata';
import { INotificationService } from '@src/services/notification';

vi.mock('@src/time/buildLookbackRange', () => ({
    buildLookbackRange: vi.fn(() => sampleCostExplorerDateRange)
}));

vi.mock('./CostExplorerWrapper', () => ({
    getCostAndUsage: vi.fn(() => sampleCostExplorerResponse)
}));


describe('handler', () => {
    // Mock notification service
    const mockNotificationService: INotificationService = {
        send: vi.fn().mockResolvedValue(undefined)
    };

    const OLD_ENV = { ...process.env };

    beforeEach(() => {
        vi.useFakeTimers()
            .setSystemTime(new Date('2024-02-07T00:00:00Z'));
        (mockNotificationService.send as any).mockClear();
    });

    afterEach(() => {
        process.env = { ...OLD_ENV };
    });

    it('should send a notification', async () => {
        const event = mockEventGenerator();
        const mockContext = {
            invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:my-function',
        } as any;
        process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.test/mock-url';
        process.env.AWS_REGION = 'us-east-1';
        await handler(event, mockContext);
        expect(mockNotificationService.send).toHaveBeenCalledTimes(1);
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
        detail: undefined,
    };
}