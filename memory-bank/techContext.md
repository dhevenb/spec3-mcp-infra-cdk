# Technical Context: Spec3 MCP Infrastructure CDK

## Technology Stack

### Core Technologies
- **AWS CDK**: Infrastructure as Code framework (v2.205.0)
- **TypeScript**: Development language (v5.6.3)
- **Node.js**: Runtime environment (v18+)
- **AWS CloudFormation**: Underlying deployment mechanism

### CDK Libraries
- **aws-cdk-lib**: Core CDK library with L2 constructs
- **constructs**: CDK constructs library (v10.0.0)
- **@types/node**: TypeScript definitions for Node.js

### Development Tools
- **TypeScript Compiler**: Type checking and compilation
- **Jest**: Testing framework for CDK constructs
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting

## Development Environment

### Prerequisites
- **Node.js**: 18.x or higher
- **AWS CLI**: Configured with appropriate credentials
- **AWS CDK CLI**: `npm install -g aws-cdk`
- **Docker**: Required for Lambda asset bundling
- **TypeScript**: Global or local installation

### Package Management
```json
{
  "devDependencies": {
    "@types/jest": "^29.5.14",
    "@types/node": "22.7.9",
    "@typescript-eslint/eslint-plugin": "^8.41.0",
    "@typescript-eslint/parser": "^8.41.0",
    "aws-cdk": "2.1021.0",
    "eslint": "^9.34.0",
    "jest": "^29.7.0",
    "prettier": "^3.6.2",
    "ts-jest": "^29.4.1",
    "ts-node": "^10.9.2",
    "typescript": "~5.6.3"
  },
  "dependencies": {
    "aws-cdk-lib": "2.205.0",
    "constructs": "^10.0.0"
  }
}
```

### Build Configuration
- **tsconfig.json**: TypeScript compiler options
- **jest.config.js**: Jest testing configuration
- **cdk.json**: CDK application configuration

## AWS Service Integration

### Lambda Service
- **Runtime**: Python 3.11
- **Memory**: 256MB (configurable)
- **Timeout**: 30 seconds (configurable)
- **Handler**: `spec3_mcp_lambda.handlers.spec3_lambda.handler`
- **Environment**: Stage-based variables

### IAM Service
- **Execution Role**: Basic Lambda execution role
- **Managed Policies**: `AWSLambdaBasicExecutionRole`
- **Permissions**: CloudWatch Logs access
- **Principals**: `lambda.amazonaws.com`

### CloudWatch Service
- **Log Groups**: Automatic creation for Lambda functions
- **Log Retention**: Default (never expire)
- **Metrics**: Built-in Lambda metrics
- **Alarms**: Not configured (future enhancement)

## Architecture Constraints

### CDK Constraints
- **Asset Paths**: Hard-coded absolute paths (needs improvement)
- **Bundling**: Docker-based bundling for Python dependencies
- **Stack Limits**: CloudFormation stack resource limits
- **Regional**: Single region deployment

### AWS Constraints
- **Lambda Limits**: Memory, timeout, concurrent executions
- **IAM Limits**: Role and policy limits per account
- **CloudFormation Limits**: Stack size and resource limits
- **Regional Resources**: Some resources are region-specific

### Integration Constraints
- **Lambda Workspace**: Dependency on external workspace
- **Asset Bundling**: Requires Docker for Python bundling
- **Environment Variables**: Limited to Lambda environment variables

## Development Workflow

### Local Development
1. **Setup**:
   ```bash
   cd spec3-mcp-infra-cdk
   npm install
   ```

2. **Development**:
   ```bash
   npm run build    # Compile TypeScript
   npm run watch    # Continuous compilation
   npm test         # Run tests
   ```

3. **Deployment**:
   ```bash
   npx cdk synth    # Generate CloudFormation
   npx cdk deploy   # Deploy infrastructure
   npx cdk diff     # Compare with deployed state
   ```

### Testing Strategy
- **Unit Tests**: CDK construct testing with Jest
- **Integration Tests**: CloudFormation template validation
- **Deployment Tests**: End-to-end deployment validation
- **Resource Tests**: AWS resource verification

### Deployment Process
1. **Code Changes**: Update TypeScript constructs
2. **Build**: Compile TypeScript to JavaScript
3. **Validate**: Run tests and CDK synthesis
4. **Deploy**: Execute CDK deployment
5. **Verify**: Check AWS Console and logs

## Configuration Management

### CDK Configuration (cdk.json)
```json
{
  "app": "npx ts-node --prefer-ts-exts bin/spec3-mcp-infra-cdk.ts",
  "watch": {
    "include": ["**"],
    "exclude": ["README.md", "cdk*.json", "**/*.d.ts", "**/*.js", "tsconfig.json", "package*.json", "yarn.lock", "node_modules", "test"]
  },
  "context": {
    "@aws-cdk/aws-lambda:recognizeLayerVersion": true,
    "@aws-cdk/core:checkSecretUsage": true,
    "@aws-cdk/core:target-partitions": ["aws", "aws-cn"],
    "@aws-cdk-containers/ecs-service-extensions:enableDefaultLogDriver": true,
    "@aws-cdk/aws-ec2:uniqueImdsv2TemplateName": true,
    "@aws-cdk/aws-ecs:arnFormatIncludesClusterName": true,
    "@aws-cdk/aws-iam:minimizePolicies": true,
    "@aws-cdk/core:validateSnapshotRemovalPolicy": true,
    "@aws-cdk/aws-codepipeline:crossAccountKeyAliasStackSafeResourceName": true,
    "@aws-cdk/aws-s3:createDefaultLoggingPolicy": true,
    "@aws-cdk/aws-sns-subscriptions:restrictSqsDescryption": true,
    "@aws-cdk/aws-apigateway:disableCloudWatchRole": true,
    "@aws-cdk/core:enablePartitionLiterals": true,
    "@aws-cdk/aws-events:eventsTargetQueueSameAccount": true,
    "@aws-cdk/aws-iam:standardizedServicePrincipals": true,
    "@aws-cdk/aws-ecs:disableExplicitDeploymentControllerForCircuitBreaker": true,
    "@aws-cdk/aws-iam:importedRoleStackSafeDefaultPolicyName": true,
    "@aws-cdk/aws-s3:serverAccessLogsUseBucketPolicy": true,
    "@aws-cdk/aws-route53-patters:useCertificate": true,
    "@aws-cdk/customresources:installLatestAwsSdkDefault": false,
    "@aws-cdk/aws-rds:databaseProxyUniqueResourceName": true,
    "@aws-cdk/aws-codedeploy:removeAlarmsFromDeploymentGroup": true,
    "@aws-cdk/aws-apigateway:authorizerChangeDeploymentLogicalId": true,
    "@aws-cdk/aws-ec2:launchTemplateDefaultUserData": true,
    "@aws-cdk/aws-secretsmanager:useAttachedSecretResourcePolicyForSecretTargetAttachments": true,
    "@aws-cdk/aws-redshift:columnId": true,
    "@aws-cdk/aws-stepfunctions-tasks:enableLogging": true,
    "@aws-cdk/aws-ec2:restrictDefaultSecurityGroup": true,
    "@aws-cdk/aws-apigateway:requestValidatorUniqueId": true,
    "@aws-cdk/aws-kms:aliasNameRef": true,
    "@aws-cdk/aws-autoscaling:generateLaunchTemplateInsteadOfLaunchConfig": true,
    "@aws-cdk/core:includePrefixInUniqueNameGeneration": true,
    "@aws-cdk/aws-efs:denyAnonymousAccess": true,
    "@aws-cdk/aws-opensearchservice:enableLogging": true,
    "@aws-cdk/aws-normlized-distribution-cloudfront-default-cache-policy": true,
    "@aws-cdk/aws-kms:defaultKeyPolicies": true,
    "@aws-cdk/aws-ec2:ebsDefaultGp3Volume": true,
    "@aws-cdk/aws-ecs:removeDefaultDeploymentAlarm": false
  }
}
```

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "declaration": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": false,
    "inlineSourceMap": true,
    "inlineSources": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false,
    "typeRoots": ["./node_modules/@types"]
  },
  "exclude": ["cdk.out"]
}
```

## Security Considerations

### IAM Security
- **Minimal Permissions**: Basic execution role only
- **No Cross-Service Access**: Lambda isolated by default
- **Managed Policies**: Use AWS managed policies where possible
- **Resource Isolation**: Environment-based resource separation

### Network Security
- **Default Networking**: Lambda uses default VPC networking
- **No VPC Configuration**: Simplified network setup
- **Public Access**: Lambda functions accessible via AWS APIs
- **CORS**: Handled at application level

### Deployment Security
- **CDK Bootstrap**: Secure CDK deployment bucket
- **IAM Permissions**: CDK deployment requires appropriate permissions
- **Asset Security**: Bundled assets stored securely
- **Environment Isolation**: Separate AWS accounts for environments (future)
