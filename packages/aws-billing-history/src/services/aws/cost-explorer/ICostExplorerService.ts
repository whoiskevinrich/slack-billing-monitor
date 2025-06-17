export interface ICostExplorerService {
  /**
   * Fetch cost and usage data for the given date range.
   * @param start Start date (Date object)
   * @param end End date (Date object)
   * @returns ResultsByTime array from AWS Cost Explorer
   */
  getCostAndUsage(start: Date, end: Date): Promise<any>;
}
