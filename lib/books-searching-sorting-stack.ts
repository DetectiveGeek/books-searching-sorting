import * as cdk from "aws-cdk-lib";
import { Stack, StackProps } from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import * as dotenv from "dotenv";

dotenv.config();

export class BooksSearchingSortingStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Define the GraphQL Lambda Reolver function
    const graphqlHandler = new lambda.Function(this, "GraphQLHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "graphqlResolver.handler",
      code: lambda.Code.fromAsset("src/lambda"),
      timeout: cdk.Duration.seconds(Number(process.env.LAMBDA_TIMEOUT_SECS)),
    });

    // Define API and add HTTP methods
    const api = new apigateway.RestApi(this, "GraphQLAPI", {
      restApiName: "GraphQL API",
    });

    const graphqlResource = api.root.addResource("graphql");
    graphqlResource.addMethod(
      "ANY",
      new apigateway.LambdaIntegration(graphqlHandler),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseModels: {
              "application/json": apigateway.Model.EMPTY_MODEL,
            },
          },
        ],
        // policies: [
        //   {
        //     userAgent: [{
        //       StringEquals: {
        //         'aws:UserAgent': [
        //           'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
        //           'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        //           // Add more User-Agent strings for web browsers
        //         ],
        //       },
        //     }],
        //   },
        // ]
      }
    );

    /*
    
    To restrict the API to be accessible from specific user-agents we need to create a 
    WAF rule with a custom policy to allow only specific user-agents.
    I have commented out the code so that we can run  it locally as aws SAM currently does not 
    support WAF. 

    // Create a WebACL for AWS WAF
    const webAcl = new waf.CfnWebACL(stack, "MyWebACL", {
      defaultAction: { allow: {} },
      scope: "REGIONAL",
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: "MyWebACL",
        sampledRequestsEnabled: true,
      },
    });

    // Create a rule to allow requests from web browsers only
    const userAgentRule = new waf.CfnWebACL.RuleProperty({
      name: "AllowWebBrowsers",
      priority: 1,
      action: {
        allow: {},
      },
      statement: {
        andStatement: {
          statements: [
            {
              byteMatchStatement: {
                fieldToMatch: {
                  singleHeader: {
                    name: "user-agent",
                  },
                },
                positionalConstraint: "EXACTLY",
                searchString: "Mozilla",
              },
            },
          ],
        },
      },
    });

    // Attach the rule to the WebACL
    webAcl.addOverride("Properties.Rules", [userAgentRule]);
    
    */

    // Output the API Gateway endpoint URL
    new cdk.CfnOutput(this, "GraphQLApiEndpoint", {
      value: api.url ?? "",
    });

    // Define Lambdas
    const dbHandler = new lambda.Function(this, "DBHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "db.connectToDatabase",
      code: lambda.Code.fromAsset("src/lambda/db"),
      environment: {
        MONGO_URI: `${process.env.MONGO_URI}`,
      },
      timeout: cdk.Duration.minutes(15),
    });

    const getBooksHandler = new lambda.Function(this, "GetBooksHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "getBooks.handler",
      code: lambda.Code.fromAsset("src/lambda/books"),
      timeout: cdk.Duration.seconds(Number(process.env.LAMBDA_TIMEOUT_SECS)),
    });

    const searchBooksHandler = new lambda.Function(this, "SearchBooksHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: "searchBooks.handler",
      code: lambda.Code.fromAsset("src/lambda/books"),
      timeout: cdk.Duration.seconds(Number(process.env.LAMBDA_TIMEOUT_SECS)),
    });
  }
}
