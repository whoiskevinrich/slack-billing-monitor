/**
 * AWS implementation of ICostFetcher using Cost Explorer.
 */
import { ICostFetcher } from './ICostFetcher';
import { getCostAndUsage } from '@src/services/aws/cost-explorer/cost-explorer-wrapper';

export class AwsCostFetcher implements ICostFetcher {
  async fetchCostAndUsage(startDate: string, endDate: string): Promise<any> {
    return getCostAndUsage(startDate, endDate);
  }
}
