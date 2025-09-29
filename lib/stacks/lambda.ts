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

    // Main MCP Lambda function
    const lambdaFunction = new lambda.Function(this, 'Spec3McpLambda', {
      functionName: `Spec3McpLambda-${props.stage}`,
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'spec3_mcp_lambda.handlers.spec3_lambda.handler',
      code: lambda.Code.fromAsset('/home/dhevb/workspaces/spec3-mcp-lambda', {
        bundling: {
          image: lambda.Runtime.PYTHON_3_11.bundlingImage,
          command: [
            '/bin/sh', '-c',
            'pip install -r requirements.txt -t /asset-output && cp -r src/* /asset-output/'
          ],
        },
      }),
      role: lambdaExecutionRole,
      environment: {
        STAGE: props.stage,
      },
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
    });

    // Enable Function URL and Streaming
    lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowCredentials: false,
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
        allowedMethods: [lambda.HttpMethod.ALL],
        maxAge: cdk.Duration.days(1)
      },
      invokeMode: lambda.InvokeMode.RESPONSE_STREAM,
    })
  }
}
