import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as apigw from '@aws-cdk/aws-apigatewayv2-alpha'
// import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class BooksSearchingSortingStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    
    super(scope, id, props);

    // Define the GraphQL Lambda Reolver function
    const graphqlHandler = new lambda.Function(this, 'GraphQLHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'graphqlResolver.handler',
      code: lambda.Code.fromAsset('lambda'),
      timeout: cdk.Duration.minutes(15)
    });

    const api = new apigateway.RestApi(this, 'GraphQLAPI', {
      restApiName: 'GraphQL API',
    });
    //   httpMethod: 'POST',
    //   options: {
    //     integrationResponses: [
    //       {
    //         statusCode: '200',
    //         responseTemplates: {
    //           'application/json': '$util.parseJson($input.body)',
    //         },
    //       },
    //     ],
    //     passthroughBehavior: apigateway.PassthroughBehavior.WHEN_NO_TEMPLATES,
    //     requestTemplates: {
    //       'application/json': JSON.stringify({
    //         version: '2017-02-28',
    //         method: 'POST',
    //         resourcePath: '/graphql',
    //         body: {
    //           query: '$util.escapeJavaScript($input.body)',
    //           variables: '$util.escapeJavaScript($input.params().get("variables"))',
    //           operationName: '$util.escapeJavaScript($input.params().get("operationName"))',
    //         },
    //       }),
    //     },
    //   },
    // });

    const graphqlResource = api.root.addResource('graphql');
    graphqlResource.addMethod('ANY', new apigateway.LambdaIntegration(graphqlHandler), {
      methodResponses: [
        {
          statusCode: '200',
          responseModels: {
            'application/json': apigateway.Model.EMPTY_MODEL,
          },
        },
      ],
    });

    // Output the API Gateway endpoint URL
    new cdk.CfnOutput(this, 'GraphQLApiEndpoint', {
      value: api.url ?? '',
    });

    const getBooksHandler = new lambda.Function(this, 'GetBooksHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'books.getBooks.handler',
      code: lambda.Code.fromAsset('lambda'),
      timeout: cdk.Duration.minutes(15)
    });

  }
}
