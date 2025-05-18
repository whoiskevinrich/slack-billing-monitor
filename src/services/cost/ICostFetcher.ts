/**
 * Abstraction for fetching cost and usage data from any provider (AWS, Azure, etc).
 */
export interface ICostFetcher {
  /**
   * Fetch cost and usage data for the given date range.
   * @param startDate The start date (YYYY-MM-DD).
   * @param endDate The end date (YYYY-MM-DD).
   * @returns The cost and usage results (shape is provider-specific).
   */
  fetchCostAndUsage(startDate: string, endDate: string): Promise<any>;
}
