import { ReportLine } from "./ReportDetail";


export class ReportHeader implements ReportLine {
    public readonly yesterdayCostColumn = 'Yesterday';
    public readonly percentChangeColumn = '% Diff';
    public readonly sparklineColumn = 'Last 7 days';

    constructor(
        readonly descriptionColumn: string
    ) { }
}
