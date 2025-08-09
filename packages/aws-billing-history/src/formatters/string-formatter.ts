/**
 * Utility class for formatting currency and percent values.
 */
export class StringFormatter {
  private static currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  private static percent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 0,
  });

  /**
   * Format a number as USD currency.
   */
  static currencyFormat(value: number): string {
    return StringFormatter.currency.format(value);
  }

  /**
   * Format a number as a percent (no decimals).
   */
  static percentFormat(value: number): string {
    return StringFormatter.percent.format(value);
  }
}
