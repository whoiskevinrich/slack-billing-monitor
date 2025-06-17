import { Formatter } from "../../formatters/Formatter";
import { padString } from "../../helpers/strings";

export type ReportLine = {
    descriptionColumn: string;
    yesterdayCostColumn: string;
    sparklineColumn: string;
    percentChangeColumn: string;
}

export class ReportDetailItem implements ReportLine {
    readonly descriptionColumn: string;
    readonly history: number[];
    readonly yesterdayCostColumn: string;
    private spark: string;

    constructor(description: string, history: number[]) {
        this.descriptionColumn = description;
        this.history = history;
        const lastHistoryValue = history.length > 0 ? history[history.length - 1] : 0;
        this.yesterdayCostColumn = Formatter.currencyFormat(lastHistoryValue).replace('$', '$  ');
    }

    public get sparklineColumn() {
        if (this.spark) { return this.spark; }

        const sparks = ['▁', '▂', '▃', '▄', '▅', '▆', '▇']
        const max = Math.max(...this.history);
        if (max === 0) { return sparks[0].repeat(this.history.length); }

        let line = '';

        this.history.forEach((value) => {
            let scaled = max === 0 ? 1 : value / max;
            let spark = Math.round(scaled * (sparks.length - 1));
            line += sparks[spark];
        });

        this.spark = line;
        return line;
    }

    public get percentChangeColumn() {
        const final = this.history.length > 0 ? this.history[this.history.length - 1] : 0;
        const initial = this.history.length > 1 ? this.history[0] : 0;

        let numericResult = initial === 0
            ? final
            : (final - initial) / Math.abs(initial);

        const stringResult = Formatter.percentFormat(numericResult).padStart(5);
        return stringResult.endsWith(' 0%') ? padString('-', 5) : stringResult;
    }
}

