#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BillingToSlackStack } from '@wikr/billing-to-slack-constructs';
import { AppContext } from '../lib/AppContext';

const app = new cdk.App();

const context = new AppContext(app);
console.log('context 👉', context);

const env: cdk.Environment = {
  account: context.awsAccount ?? process.env.CDK_DEFAULT_ACCOUNT,
  region: context.awsRegion ?? process.env.CDK_DEFAULT_REGION,
};

new BillingToSlackStack(app, 'BillingToSlackStack', {
  env,
  slackWorkspaceId: context.slackWorkspaceId,
  slackChannelId: context.slackChannelId,
  slackChannelConfigurationArn: context.slackChannelConfigurationArn,
  logGroupName: context.logGroupName ?? context.appName
});