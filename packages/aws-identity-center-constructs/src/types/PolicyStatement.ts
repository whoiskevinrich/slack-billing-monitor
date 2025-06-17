import { Effect } from "./Effect";

export type PolicyStatement = {
    Sid?: string;
    Effect: Effect;
    Action: string | string[];
};
