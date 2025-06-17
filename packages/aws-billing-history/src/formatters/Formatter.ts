/**
 * Utility class for formatting currency and percent values.
 */
export class Formatter {
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
    return Formatter.currency.format(value);
  }

  /**
   * Format a number as a percent (no decimals).
   */
  static percentFormat(value: number): string {
    return Formatter.percent.format(value);
  }
}
