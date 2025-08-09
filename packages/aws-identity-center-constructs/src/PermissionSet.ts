import { Duration, Resource, Token } from "aws-cdk-lib";
import { CfnPermissionSet } from "aws-cdk-lib/aws-sso";
import { Construct } from "constructs";
import { InlinePolicy } from "./types/InlinePolicy";



/**
 * Properties for configuring a PermissionSet.
 *
 * @property instanceArn The ARN of the SSO instance. (required)
 * @property name The name of the permission set. (required)
 * @property description An optional description for the permission set. Defaults to undefined.
 * @property managedPolicyArns Optional list of managed policy ARNs to attach. Defaults to undefined.
 * @property inlinePolicy Optional inline policy object. Defaults to undefined.
 * @property tags Optional array of tags as key-value pairs. Defaults to undefined.
 * @property sessionDuration Optional session duration. Defaults to undefined.
 */
export interface PermissionSetProps {
    /** The ARN of the SSO instance. */
    readonly instanceArn: string;
    /** The name of the permission set. */
    readonly name: string;
    /** An optional description for the permission set. */
    readonly description?: string;
    /** Optional list of managed policy ARNs to attach. */
    readonly managedPolicyArns?: string[];
    /** Optional inline policy object. */
    readonly inlinePolicy?: InlinePolicy;
    /** Optional array of tags as key-value pairs. */
    readonly tags?: Array<Record<string, string>>;
    /** Optional session duration. */
    readonly sessionDuration?: Duration;
}


/**
 * Represents a PermissionSet resource in AWS SSO.
 *
 * Optional properties are handled safely and default to undefined if not provided.
 *
 * @property description Optional description. Defaults to undefined.
 * @property managedPolicyArns Optional list of managed policy ARNs. Defaults to undefined.
 * @property inlinePolicy Optional inline policy. Defaults to undefined.
 * @property sessionDuration Optional session duration (ISO string). Defaults to undefined.
 */
export class PermissionSet extends Resource {
    /** The name of the permission set. */
    public readonly permissionSetName: string;
    /** Optional description. */
    public readonly description?: string;
    /** Optional list of managed policy ARNs. */
    public readonly managedPolicyArns?: string[];
    /** Optional inline policy. */
    public readonly inlinePolicy?: InlinePolicy;
    /** Optional session duration (ISO string). */
    public readonly sessionDuration?: string;
    private readonly instanceArn: string;

    constructor(scope: Construct, id: string, props: PermissionSetProps) {
        super(scope, id, {
            physicalName: props.name
        });

        this.validateName(props.name);
        this.validateInstanceArn(props.instanceArn);
        this.validateDescription(props.description);
        this.validateManagedPolicyArns(props.managedPolicyArns);
        this.validateInlinePolicy(props.inlinePolicy);
        this.validateSessionDuration(props.sessionDuration);

        this.permissionSetName = props.name;
        this.description = props.description;
        this.instanceArn = props.instanceArn;
        this.managedPolicyArns = props.managedPolicyArns;
        this.inlinePolicy = props.inlinePolicy;
        this.sessionDuration = props.sessionDuration
            ? props.sessionDuration.toIsoString()
            : undefined;

        const permissionSet = new CfnPermissionSet(this, 'PermissionSet', {
            instanceArn: this.instanceArn,
            name: this.permissionSetName,
            description: this.description,
            managedPolicies: this.managedPolicyArns,
            inlinePolicy: this.inlinePolicy,
            sessionDuration: this.sessionDuration,
        });
    }

    private validateName(name: string) {
        const pattern = new RegExp('^[\w+=,.@-]{1,32}$');
        if (name && !Token.isUnresolved(name) && pattern.test(name)) {
            throw new Error(`PermissionSet name must be between 1 and 32 characters long, and can contain the following characters: a-zA-Z0-9+=,.@-`);
        }
    }

    private validateInstanceArn(instanceArn: string) {
        const pattern = new RegExp('arn:(aws|aws-us-gov|aws-cn|aws-iso|aws-iso-b):sso:::instance/(sso)?ins-[a-zA-Z0-9-.]{16}/');
        if (instanceArn && !Token.isUnresolved(instanceArn) && pattern.test(instanceArn)) {
            throw new Error(`PermissionSet instanceArn must be a valid SSO instance ARN`);
        }
    }

    private validateDescription(description?: string) {
        const pattern = new RegExp('[\u0009\u000A\u000D\u0020-\u007E\u00A1-\u00FF]*{1,700}')
        if (description && !Token.isUnresolved(description) && pattern.test(description)) {
            throw new Error(`PermissionSet description must be between 1 and 700 characters long, and can contain the following characters: a-zA-Z0-9+=,.@-`);
        }
    }

    private validateManagedPolicyArns(managedPolicyArns?: string[]) {
        if (managedPolicyArns && !Token.isUnresolved(managedPolicyArns) && managedPolicyArns.length >= 20) {
            throw new Error(`PermissionSet managedPolicyArns must be an array of no more than 20 managed policy ARNs`);
        }
    }

    private validateInlinePolicy(inlinePolicy?: InlinePolicy) {
        const pattern = new RegExp('[\u0009\u000A\u000D\u0020-\u00FF]+{1,32768}');
        const jsonString = JSON.stringify(inlinePolicy);
        if (inlinePolicy && !Token.isUnresolved(inlinePolicy) && pattern.test(jsonString)) {
            throw new Error(`PermissionSet inlinePolicy must be a valid JSON string of no more than 32768 characters`);
        }
    }

    private validateSessionDuration(sessionDuration?: Duration) {
        if (!sessionDuration) return;

        if (!Token.isUnresolved(sessionDuration) && sessionDuration.toMinutes() < 15 || sessionDuration?.toHours() > 12) {
            throw new Error(`PermissionSet sessionDuration must be between 900 seconds (15 minutes) and 43200 seconds (12 hours)`);
        }
    }
}