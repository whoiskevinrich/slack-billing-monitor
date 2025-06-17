import { ReportDetailItem, ReportLine } from './ReportDetail';
import { ReportHeader } from './ReportHeader';
import { toTitleCase } from '../../helpers/strings';


export class Report {
    constructor(
        public summary: string,
        public groupBy: string,
        public readonly details: ReportLine[] = [],
        public totalCost: number = 0
    ) {
        details.push(new ReportHeader(toTitleCase(groupBy)));
     }

    public addDetail(detail: ReportDetailItem | ReportHeader) {
        this.details.push(detail);
    }
}
