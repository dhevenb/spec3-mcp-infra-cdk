import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface LambdaStackProps extends cdk.StackProps {
  /**
   * Environment name (e.g., 'dev', 'staging', 'prod')
   */
  stage: string;
}

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    // Create a basic execution role for Lambda functions
    const lambdaExecutionRole = new iam.Role(this, 'LambdaExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    // Example Lambda function - you can customize this or add more
    const exampleFunction = new lambda.Function(this, 'ExampleFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log('Event:', JSON.stringify(event, null, 2));
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: 'Hello from Lambda!',
              timestamp: new Date().toISOString(),
              environment: '${props.stage}'
            })
          };
        };
      `),
      role: lambdaExecutionRole,
    });

  }
}
