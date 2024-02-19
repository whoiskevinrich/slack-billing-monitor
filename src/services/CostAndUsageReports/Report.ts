import { ReportDetailItem, ReportLine } from './ReportDetail';
import { ReportHeader } from './ReportHeader';


export class Report {
    constructor(
        public summary: string,
        public groupBy: string,
        public readonly details: ReportLine[] = []
    ) {
        details.push(new ReportHeader(groupBy));
     }

    public addDetail(detail: ReportDetailItem | ReportHeader) {
        this.details.push(detail);
    }
}
