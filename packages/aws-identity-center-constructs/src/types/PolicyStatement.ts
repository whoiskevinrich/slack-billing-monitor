
import { Effect } from "./Effect";

/**
 * Represents an IAM policy statement.
 *
 * @property Sid Optional statement ID. Defaults to undefined if not provided.
 * @property Effect The effect for the statement (Allow or Deny).
 * @property Action The action or list of actions for the statement.
 */
export type PolicyStatement = {
    /** Optional statement ID. */
    Sid?: string;
    /** The effect for the statement (Allow or Deny). */
    Effect: Effect;
    /** The action or list of actions for the statement. */
    Action: string | string[];
};
