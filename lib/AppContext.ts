import { Construct } from "constructs";
import { Validator } from "fluentvalidation-ts";

interface IAppContext {
    readonly appName: string | undefined;
    readonly awsAccount: string | undefined;
    readonly awsRegion: string | undefined;
    readonly slackWorkspaceId: string | undefined;
    readonly slackChannelId: string | undefined;
    readonly slackChannelConfigurationArn: string | undefined;
    readonly logGroupName: string | undefined;
}

export class AppContext implements IAppContext {
    public readonly appName: string | undefined = undefined;
    public readonly awsAccount: string | undefined = undefined;
    public readonly awsRegion: string | undefined = undefined;
    public readonly slackWorkspaceId: string | undefined = undefined;
    public readonly slackChannelId: string | undefined = undefined;
    public readonly slackChannelConfigurationArn: string | undefined = undefined;
    public readonly logGroupName: string | undefined = undefined;

    constructor(construct: Construct) {
        this.appName = construct.node.tryGetContext("app-name");
        this.awsAccount = construct.node.tryGetContext("aws-account");
        this.awsRegion = construct.node.tryGetContext("aws-region");
        this.slackWorkspaceId = construct.node.tryGetContext("slack-workspace-id");
        this.slackChannelId = construct.node.tryGetContext("slack-channel-id");
        this.slackChannelConfigurationArn = construct.node.tryGetContext("slack-channel-configuration-arn");
        this.logGroupName = construct.node.tryGetContext("log-group-name");

        const validator = new AppContextValidator();
        const validatorResults = validator.validate(this);
        if (Object.keys(validatorResults).length > 0) {
            throw new Error(`⛔ Invalid context values: ${JSON.stringify(validatorResults, null, 2)}`);
        }
    }

}

class AppContextValidator extends Validator<AppContext> {
    constructor() {
        super();

        this.ruleFor("slackWorkspaceId")
            .notNull()
            .unless((x) => x.slackChannelConfigurationArn !== undefined);

        this.ruleFor("slackChannelId")
            .notNull()
            .unless((x) => x.slackChannelConfigurationArn !== undefined);

        this.ruleFor("slackChannelConfigurationArn")
            .notNull()
            .unless((x) => x.slackWorkspaceId !== undefined && x.slackChannelId !== undefined);

        this.ruleFor("logGroupName")
            .length(1, 512)
            .matches(/^[a-zA-Z0-9-_\.]+$/)
            .unless((x) => x.logGroupName === undefined);
    }
}