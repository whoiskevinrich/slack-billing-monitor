import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as eventTargets from 'aws-cdk-lib/aws-events-targets';
import * as destinations from 'aws-cdk-lib/aws-lambda-destinations';
import * as nodeLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as chatbot from 'aws-cdk-lib/aws-chatbot';
import { Construct } from 'constructs';
import path = require('path');

export interface BillingToSlackStackProps extends cdk.StackProps {

  /**
   * Slack workspace ID
   * @required
   * @example T12345678
   */
  readonly slackWorkspaceId: string | undefined;

  /**
   * Slack channel ID
   * @required
   * @example C12345678
   */
  readonly slackChannelId: string | undefined;

  /**
   * Slack configuration ID
   * @required
   * @example BillingToSlack
   */
  readonly slackChannelConfigurationArn: string | undefined;
  readonly logGroupName: string | undefined;

  /**
   * Optional ARN of an existing log group
   * @optional
   * @default - (null) new log group will be created
   */
  readonly logArn?: string;
  readonly snsTopicArn?: string;
}

export class BillingToSlackStack extends cdk.Stack {

  public readonly logGroup: logs.ILogGroup;
  public readonly slackChannelChatbotConfiguration: chatbot.ISlackChannelConfiguration;
  public readonly snsTopic: sns.ITopic;

  constructor(scope: Construct, id: string, props: BillingToSlackStackProps) {
    super(scope, id, props);

    this.snsTopic = props?.snsTopicArn
      ? sns.Topic.fromTopicArn(this, 'result-topic', props.snsTopicArn)
      : new sns.Topic(this, 'result-topic', {});

    this.slackChannelChatbotConfiguration = props.slackChannelConfigurationArn
      ? chatbot.SlackChannelConfiguration.fromSlackChannelConfigurationArn(this, 'slack-channel-configuration', props.slackChannelConfigurationArn)
      : new chatbot.SlackChannelConfiguration(this, 'slack-channel-configuration', {
        slackWorkspaceId: props.slackWorkspaceId!,
        slackChannelId: props.slackChannelId!,
        slackChannelConfigurationName: 'BillingToSlack',
        guardrailPolicies: [iam.ManagedPolicy.fromManagedPolicyName(this, 'GuardrailPolicy', 'ReadOnlyAccess')],
        loggingLevel: chatbot.LoggingLevel.INFO,
        notificationTopics: [this.snsTopic],
      });

    this.logGroup = props.logArn
      ? logs.LogGroup.fromLogGroupArn(this, 'log-group', props.logArn)
      : new logs.LogGroup(this, 'log-group', {
        logGroupName: props.logGroupName,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        retention: logs.RetentionDays.ONE_MONTH,
      });

    const functionArchitectureOptions = {
      architecture: lambda.Architecture.ARM_64,
      runtime: lambda.Runtime.NODEJS_20_X,
    }

    const functionLoggingOptions = {
      logGroup: this.logGroup,
      logFormat: lambda.LogFormat.JSON,
      applicationLogLevel: "INFO",
    };

    const functionBundlingOptions = {
      minify: true,
      sourceMap: true,
      externalModules: [
        '@aws-sdk/client-sns',
        "@aws-sdk/client-cost-explorer",
      ],
    };

    const lambdaFunction = new nodeLambda.NodejsFunction(this, 'report-generator', {
      description: 'Lambda function to generate billing report',
      ...functionArchitectureOptions,
      ...functionLoggingOptions,
      ...functionBundlingOptions,
      environment: {
        SNS_TOPIC_ARN: this.snsTopic.topicArn,
      },
    });
    this.snsTopic.grantPublish(lambdaFunction);

    const getCostandUsagePolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ce:GetCostAndUsage'],
      resources: ['*'],
    });
    lambdaFunction.addToRolePolicy(getCostandUsagePolicy);

    // cron expressions: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html
    const timerEventRule = new events.Rule(this, 'timer-event-rule', {
      schedule: events.Schedule.cron({ minute: '0', hour: '8', weekDay: 'MON' }),
      description: 'Run every Monday at 8:00 UTC',
    });

    timerEventRule.addTarget(new eventTargets.LambdaFunction(lambdaFunction));

    console.log('⚠️ Remember to invite @aws to the slack channel');
  }
}
