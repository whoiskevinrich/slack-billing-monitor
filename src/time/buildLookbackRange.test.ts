import { buildLookbackRange } from './buildLookbackRange';

describe('buildLookbackRange', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2024-02-08T00:00:00Z'));
    });

    afterAll(() => {
        jest.useRealTimers();
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
