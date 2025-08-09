import { describe, it, expect } from 'vitest';
import { StringFormatter } from './string-formatter';

// Test suite for StringFormatter

describe('StringFormatter', () => {
  describe('currencyFormat', () => {
    it('formats positive numbers as USD currency', () => {
      expect(StringFormatter.currencyFormat(1234.56)).toBe('$1,234.56');
      expect(StringFormatter.currencyFormat(0)).toBe('$0.00');
    });

    it('formats negative numbers as USD currency', () => {
      expect(StringFormatter.currencyFormat(-987.65)).toBe('-$987.65');
    });

    it('formats large numbers with commas', () => {
      expect(StringFormatter.currencyFormat(1000000)).toBe('$1,000,000.00');
    });
  });

  describe('percentFormat', () => {
    it('formats numbers as percent with no decimals', () => {
      expect(StringFormatter.percentFormat(0.25)).toBe('25%');
      expect(StringFormatter.percentFormat(1)).toBe('100%');
      expect(StringFormatter.percentFormat(0)).toBe('0%');
    });

    it('formats negative numbers as percent', () => {
      expect(StringFormatter.percentFormat(-0.5)).toBe('-50%');
    });

    it('rounds to nearest whole percent', () => {
      expect(StringFormatter.percentFormat(0.123)).toBe('12%');
      expect(StringFormatter.percentFormat(0.126)).toBe('13%');
    });
  });
});
