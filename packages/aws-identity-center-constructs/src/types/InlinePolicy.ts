import { PolicyStatement } from "./PolicyStatement";

export class InlinePolicy {
    public readonly Version = '2012-10-17';
    constructor(
        public readonly Statement: PolicyStatement[],
    ) { }
}
