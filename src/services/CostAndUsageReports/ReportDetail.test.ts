import { ReportDetailItem } from "./ReportDetail";

describe('sparkline', () => {

    test.each([
        [[0,1,2,3,4,5,6],'▁▂▃▄▅▆▇'],
        [[0,0,0,0,0,0,0],'▁▁▁▁▁▁▁'],
        [[6,5,4,3,2,1,0],'▇▆▅▄▃▂▁'],
    ])('should generate a sparkline', (history, expected) => {
        const result = new ReportDetailItem('test', history).sparklineColumn;
        expect(result).toEqual(expected);
    });
});

describe('delta', () => {

    test.each([
        [[0,1,2,3,4,5,6],'600%'],
        [[0,0,0,0,0,0,0],'0%'],
        [[6,5,4,3,2,1,0],'-100%'],
        [[6,6,5,4,3,3,3], '-50%'],
        [[3.5,1,1,1,1,1,2.625], '-25%'],
    ])('should calculate the delta', (history, expected) => {
        const result = new ReportDetailItem('test', history).percentChangeColumn;
        expect(result).toEqual(expected);
    });
});

describe('yesterday', () => {
        it('should format the yesterday value', () => {
            const history = [1234];
            const result = new ReportDetailItem('test', history).yesterdayCostColumn;
            expect(result).toEqual('$1,234.00');
        });

        test.each([
            [[1234], '$1,234.00'],
            [[1,2,3,4,5,6,7], '$7.00']
        ])('should format the yesterday value', (history, expected) => {
            const result = new ReportDetailItem('test', history).yesterdayCostColumn;
            expect(result).toEqual(expected);
        });
});