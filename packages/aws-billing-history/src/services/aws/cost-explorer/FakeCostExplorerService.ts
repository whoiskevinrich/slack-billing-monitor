/**
 * FakeCostExplorerWrapper implements ICostExplorerWrapper for testing and development.
 * It returns mock cost and usage data.
 */
import { ICostExplorerService } from './ICostExplorerService';
import { sampleCostExplorerResponse } from './AwsCostExplorerService.sampledata';

export class FakeCostExplorerService implements ICostExplorerService {
  async getCostAndUsage(start: Date, end: Date): Promise<any> {
    // Always return the sample data's ResultsByTime array
    return sampleCostExplorerResponse.ResultsByTime;
  }
}
