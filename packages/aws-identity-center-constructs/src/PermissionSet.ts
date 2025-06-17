import { Duration, Resource, Token } from "aws-cdk-lib";
import { CfnPermissionSet } from "aws-cdk-lib/aws-sso";
import { Construct } from "constructs";
import { InlinePolicy } from "./types/InlinePolicy";


export interface PermissionSetProps {
    readonly instanceArn: string;
    readonly name: string;
    readonly description?: string;
    readonly managedPolicyArns?: string[];
    readonly inlinePolicy?: InlinePolicy;
    readonly tags?: [{ [key: string]: string }];
    readonly sessionDuration?: Duration;
}

export class PermissionSet extends Resource {

    public readonly permissionSetName: string;
    public readonly description?: string;
    public readonly managedPolicyArns?: string[];
    public readonly inlinePolicy?: InlinePolicy;
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