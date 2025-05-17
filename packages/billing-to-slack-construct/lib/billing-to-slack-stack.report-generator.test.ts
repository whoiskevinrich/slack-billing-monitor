import 'aws-sdk-client-mock-jest';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { EventBridgeEvent } from 'aws-lambda';
import { mockClient } from 'aws-sdk-client-mock';
import { handler } from './billing-to-slack-stack.report-generator';
import { sampleCostExplorerDateRange, sampleCostExplorerResponse } from '@src/services/aws/cost-explorer/cost-explorer-wrapper.sampledata';

jest.mock('@src/time/buildLookbackRange', () => {
    return {
        buildLookbackRange: jest.fn(() => {
            return sampleCostExplorerDateRange;
        })
    }
});

jest.mock('./cost-explorer-wrapper', () => {
    return {
        getCostAndUsage: jest.fn(() => {
            return sampleCostExplorerResponse;
        })
    }
});


describe('handler', () => {
    const mockSns = mockClient(SNSClient);
    mockSns.on(PublishCommand).resolves({
        MessageId: '0'
    });

    const mockGetCostAndUsage = jest.fn();
    mockGetCostAndUsage.mockReturnValue(sampleCostExplorerResponse);

    beforeAll(() => {
        jest.useFakeTimers()
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
    
        const result = await handler(event, mockContext);
    
        expect(mockSns).toHaveReceivedCommandTimes(PublishCommand, 1);
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