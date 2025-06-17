import { App } from "aws-cdk-lib";
import { Validator } from "fluentvalidation-ts";

interface IAppContext {
    readonly appName?: string;
    readonly awsAccount?: string;
    readonly awsRegion?: string;
    readonly slackWorkspaceId?: string;
    readonly slackChannelId?: string;
    readonly slackChannelConfigurationArn?: string;
    readonly logGroupName?: string;
}

export class AppContext implements IAppContext {
    public readonly appName?: string;
    public readonly awsAccount?: string;
    public readonly awsRegion?: string;
    public readonly slackWorkspaceId: string;
    public readonly slackChannelId: string;
    public readonly slackChannelConfigurationArn: string;
    public readonly logGroupName: string | undefined;

    constructor(app: App) {
        console.log({appContext: app.node.getAllContext()});

        this.appName = app.node.tryGetContext("appName");
        this.awsAccount = app.node.tryGetContext("awsAccount");
        this.awsRegion = app.node.tryGetContext("awsRegion");
        this.slackWorkspaceId = app.node.tryGetContext("slackWorkspaceId");
        this.slackChannelId = app.node.tryGetContext("slackChannelId");
        this.slackChannelConfigurationArn = app.node.tryGetContext("slackChannelConfigurationArn");
        this.logGroupName = app.node.tryGetContext("logGroupName");

        console.log({readContext: this})

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