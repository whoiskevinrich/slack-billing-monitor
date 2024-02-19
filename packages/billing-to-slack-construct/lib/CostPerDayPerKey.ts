
export class CostPerDayPerKey {
    key: string;
    cost: number;
    date: string;

    constructor(fields: { key: string; cost: number; date: string; }) {
        Object.assign(this, fields);
    }
}
