import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaStack } from './stacks/lambda';

export class Spec3McpInfraCdk extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    const lambdaStack = new LambdaStack(this, 'LambdaStack', {
      stage: 'dev'
    });

  }
}
