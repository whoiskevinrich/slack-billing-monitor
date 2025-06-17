import { buildLookbackRange } from './buildLookbackRange';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('buildLookbackRange', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-02-08T00:00:00Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should return an array of dates', () => {
        const result = buildLookbackRange(7);
        expect(result).toHaveLength(7);
    });

    it('should return an array starting 7 days ago', () => {
        const result = buildLookbackRange(7);
        expect(result[0]).toEqual(new Date('2024-02-01T00:00:00Z'));
    });

    it('should return an array ending yesterday', () => {
        const result = buildLookbackRange(7);
        expect(result[6]).toEqual(new Date('2024-02-07T00:00:00Z'));
    });
});
