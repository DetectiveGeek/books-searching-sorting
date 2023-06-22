"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksSearchingSortingStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
// import * as apigw from '@aws-cdk/aws-apigatewayv2-alpha'
// import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
const apigateway = require("aws-cdk-lib/aws-apigateway");
class BooksSearchingSortingStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // Define the GraphQL Lambda Reolver function
        const graphqlHandler = new lambda.Function(this, 'GraphQLHandler', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'graphqlResolver.handler',
            code: lambda.Code.fromAsset('lambda'),
        });
        // Create the GraphQL API using API Gateway
        // const api = new apigw.HttpApi(this, 'GraphQLApi');
        const api = new apigateway.RestApi(this, 'GraphQLAPI', {
            restApiName: 'GraphQL API',
        });
        // const graphqlIntegration = new apigateway.HttpIntegration('http://127.0.0.1', {
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
        // Add permission for the Lambda function to be invoked by API Gateway
        // lambdaFn.addPermission('GraphQLResolverPermission', {
        //   principal: new lambda.ServicePrincipal('apigateway.amazonaws.com'),
        // });
        // Create the integration between API Gateway and Lambda
        // const integration = new integrations.LambdaProxyIntegration({
        //   handler: lambdaFn,
        // });
        // const helloIntegration = new HttpLambdaIntegration('HelloIntegration', lambdaFn);
        // // Create a route for handling GraphQL requests and wire up the integration
        // api.addRoutes({
        //   path: '/graphql',
        //   methods: [apigw.HttpMethod.POST],
        //   integration: helloIntegration,
        // });
        // Output the API Gateway endpoint URL
        new cdk.CfnOutput(this, 'GraphQLApiEndpoint', {
            value: api.url ?? '',
        });
        // Defines AWS Lambda
        // const helloLambda :lambda.Function = new lambda.Function(this, "HelloHandler", {
        //   runtime: lambda.Runtime.NODEJS_18_X, // execution environment
        //   code: lambda.Code.fromAsset("lambda"), // code loaded from "lambda" directory.
        //   handler: 'hello.handler', // file is "hello", function is "handler"
        // });
    }
}
exports.BooksSearchingSortingStack = BooksSearchingSortingStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va3Mtc2VhcmNoaW5nLXNvcnRpbmctc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib29rcy1zZWFyY2hpbmctc29ydGluZy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsNkNBQWdEO0FBQ2hELGlEQUFpRDtBQUNqRCwyREFBMkQ7QUFDM0Qsd0ZBQXdGO0FBQ3hGLHlEQUF5RDtBQUd6RCxNQUFhLDBCQUEyQixTQUFRLG1CQUFLO0lBQ25ELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFFMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkNBQTZDO1FBQzdDLE1BQU0sY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDakUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7U0FDdEMsQ0FBQyxDQUFDO1FBRUgsMkNBQTJDO1FBQzNDLHFEQUFxRDtRQUNyRCxNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNyRCxXQUFXLEVBQUUsYUFBYTtTQUMzQixDQUFDLENBQUM7UUFFSCxrRkFBa0Y7UUFDbEYsd0JBQXdCO1FBQ3hCLGVBQWU7UUFDZiw4QkFBOEI7UUFDOUIsVUFBVTtRQUNWLDZCQUE2QjtRQUM3QiwrQkFBK0I7UUFDL0IsZ0VBQWdFO1FBQ2hFLGFBQWE7UUFDYixXQUFXO1FBQ1gsU0FBUztRQUNULDZFQUE2RTtRQUM3RSwwQkFBMEI7UUFDMUIsNkNBQTZDO1FBQzdDLGlDQUFpQztRQUNqQywwQkFBMEI7UUFDMUIsb0NBQW9DO1FBQ3BDLGtCQUFrQjtRQUNsQiwwREFBMEQ7UUFDMUQsbUZBQW1GO1FBQ25GLDJGQUEyRjtRQUMzRixhQUFhO1FBQ2IsWUFBWTtRQUNaLFNBQVM7UUFDVCxPQUFPO1FBQ1AsTUFBTTtRQUVOLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ2pGLGVBQWUsRUFBRTtnQkFDZjtvQkFDRSxVQUFVLEVBQUUsS0FBSztvQkFDakIsY0FBYyxFQUFFO3dCQUNkLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVztxQkFDakQ7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILHNFQUFzRTtRQUN0RSx3REFBd0Q7UUFDeEQsd0VBQXdFO1FBQ3hFLE1BQU07UUFFTix3REFBd0Q7UUFDeEQsZ0VBQWdFO1FBQ2hFLHVCQUF1QjtRQUN2QixNQUFNO1FBRU4sb0ZBQW9GO1FBRXBGLDhFQUE4RTtRQUM5RSxrQkFBa0I7UUFDbEIsc0JBQXNCO1FBQ3RCLHNDQUFzQztRQUN0QyxtQ0FBbUM7UUFDbkMsTUFBTTtRQUVOLHNDQUFzQztRQUN0QyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQzVDLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUU7U0FDckIsQ0FBQyxDQUFDO1FBRUgscUJBQXFCO1FBQ3JCLG1GQUFtRjtRQUNuRixrRUFBa0U7UUFDbEUsbUZBQW1GO1FBQ25GLHdFQUF3RTtRQUN4RSxNQUFNO0lBQ1IsQ0FBQztDQUNGO0FBeEZELGdFQXdGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbi8vIGltcG9ydCAqIGFzIGFwaWd3IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5djItYWxwaGEnXG4vLyBpbXBvcnQgeyBIdHRwTGFtYmRhSW50ZWdyYXRpb24gfSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheXYyLWludGVncmF0aW9ucy1hbHBoYSc7XG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgY2xhc3MgQm9va3NTZWFyY2hpbmdTb3J0aW5nU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIFxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gRGVmaW5lIHRoZSBHcmFwaFFMIExhbWJkYSBSZW9sdmVyIGZ1bmN0aW9uXG4gICAgY29uc3QgZ3JhcGhxbEhhbmRsZXIgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdHcmFwaFFMSGFuZGxlcicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xOF9YLFxuICAgICAgaGFuZGxlcjogJ2dyYXBocWxSZXNvbHZlci5oYW5kbGVyJyxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgdGhlIEdyYXBoUUwgQVBJIHVzaW5nIEFQSSBHYXRld2F5XG4gICAgLy8gY29uc3QgYXBpID0gbmV3IGFwaWd3Lkh0dHBBcGkodGhpcywgJ0dyYXBoUUxBcGknKTtcbiAgICBjb25zdCBhcGkgPSBuZXcgYXBpZ2F0ZXdheS5SZXN0QXBpKHRoaXMsICdHcmFwaFFMQVBJJywge1xuICAgICAgcmVzdEFwaU5hbWU6ICdHcmFwaFFMIEFQSScsXG4gICAgfSk7XG5cbiAgICAvLyBjb25zdCBncmFwaHFsSW50ZWdyYXRpb24gPSBuZXcgYXBpZ2F0ZXdheS5IdHRwSW50ZWdyYXRpb24oJ2h0dHA6Ly8xMjcuMC4wLjEnLCB7XG4gICAgLy8gICBodHRwTWV0aG9kOiAnUE9TVCcsXG4gICAgLy8gICBvcHRpb25zOiB7XG4gICAgLy8gICAgIGludGVncmF0aW9uUmVzcG9uc2VzOiBbXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3RhdHVzQ29kZTogJzIwMCcsXG4gICAgLy8gICAgICAgICByZXNwb25zZVRlbXBsYXRlczoge1xuICAgIC8vICAgICAgICAgICAnYXBwbGljYXRpb24vanNvbic6ICckdXRpbC5wYXJzZUpzb24oJGlucHV0LmJvZHkpJyxcbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgXSxcbiAgICAvLyAgICAgcGFzc3Rocm91Z2hCZWhhdmlvcjogYXBpZ2F0ZXdheS5QYXNzdGhyb3VnaEJlaGF2aW9yLldIRU5fTk9fVEVNUExBVEVTLFxuICAgIC8vICAgICByZXF1ZXN0VGVtcGxhdGVzOiB7XG4gICAgLy8gICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgLy8gICAgICAgICB2ZXJzaW9uOiAnMjAxNy0wMi0yOCcsXG4gICAgLy8gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAvLyAgICAgICAgIHJlc291cmNlUGF0aDogJy9ncmFwaHFsJyxcbiAgICAvLyAgICAgICAgIGJvZHk6IHtcbiAgICAvLyAgICAgICAgICAgcXVlcnk6ICckdXRpbC5lc2NhcGVKYXZhU2NyaXB0KCRpbnB1dC5ib2R5KScsXG4gICAgLy8gICAgICAgICAgIHZhcmlhYmxlczogJyR1dGlsLmVzY2FwZUphdmFTY3JpcHQoJGlucHV0LnBhcmFtcygpLmdldChcInZhcmlhYmxlc1wiKSknLFxuICAgIC8vICAgICAgICAgICBvcGVyYXRpb25OYW1lOiAnJHV0aWwuZXNjYXBlSmF2YVNjcmlwdCgkaW5wdXQucGFyYW1zKCkuZ2V0KFwib3BlcmF0aW9uTmFtZVwiKSknLFxuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICB9KSxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSk7XG5cbiAgICBjb25zdCBncmFwaHFsUmVzb3VyY2UgPSBhcGkucm9vdC5hZGRSZXNvdXJjZSgnZ3JhcGhxbCcpO1xuICAgIGdyYXBocWxSZXNvdXJjZS5hZGRNZXRob2QoJ0FOWScsIG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGdyYXBocWxIYW5kbGVyKSwge1xuICAgICAgbWV0aG9kUmVzcG9uc2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAnMjAwJyxcbiAgICAgICAgICByZXNwb25zZU1vZGVsczoge1xuICAgICAgICAgICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBhcGlnYXRld2F5Lk1vZGVsLkVNUFRZX01PREVMLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgLy8gQWRkIHBlcm1pc3Npb24gZm9yIHRoZSBMYW1iZGEgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCBieSBBUEkgR2F0ZXdheVxuICAgIC8vIGxhbWJkYUZuLmFkZFBlcm1pc3Npb24oJ0dyYXBoUUxSZXNvbHZlclBlcm1pc3Npb24nLCB7XG4gICAgLy8gICBwcmluY2lwYWw6IG5ldyBsYW1iZGEuU2VydmljZVByaW5jaXBhbCgnYXBpZ2F0ZXdheS5hbWF6b25hd3MuY29tJyksXG4gICAgLy8gfSk7XG5cbiAgICAvLyBDcmVhdGUgdGhlIGludGVncmF0aW9uIGJldHdlZW4gQVBJIEdhdGV3YXkgYW5kIExhbWJkYVxuICAgIC8vIGNvbnN0IGludGVncmF0aW9uID0gbmV3IGludGVncmF0aW9ucy5MYW1iZGFQcm94eUludGVncmF0aW9uKHtcbiAgICAvLyAgIGhhbmRsZXI6IGxhbWJkYUZuLFxuICAgIC8vIH0pO1xuICAgIFxuICAgIC8vIGNvbnN0IGhlbGxvSW50ZWdyYXRpb24gPSBuZXcgSHR0cExhbWJkYUludGVncmF0aW9uKCdIZWxsb0ludGVncmF0aW9uJywgbGFtYmRhRm4pO1xuXG4gICAgLy8gLy8gQ3JlYXRlIGEgcm91dGUgZm9yIGhhbmRsaW5nIEdyYXBoUUwgcmVxdWVzdHMgYW5kIHdpcmUgdXAgdGhlIGludGVncmF0aW9uXG4gICAgLy8gYXBpLmFkZFJvdXRlcyh7XG4gICAgLy8gICBwYXRoOiAnL2dyYXBocWwnLFxuICAgIC8vICAgbWV0aG9kczogW2FwaWd3Lkh0dHBNZXRob2QuUE9TVF0sXG4gICAgLy8gICBpbnRlZ3JhdGlvbjogaGVsbG9JbnRlZ3JhdGlvbixcbiAgICAvLyB9KTtcblxuICAgIC8vIE91dHB1dCB0aGUgQVBJIEdhdGV3YXkgZW5kcG9pbnQgVVJMXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0dyYXBoUUxBcGlFbmRwb2ludCcsIHtcbiAgICAgIHZhbHVlOiBhcGkudXJsID8/ICcnLFxuICAgIH0pO1xuXG4gICAgLy8gRGVmaW5lcyBBV1MgTGFtYmRhXG4gICAgLy8gY29uc3QgaGVsbG9MYW1iZGEgOmxhbWJkYS5GdW5jdGlvbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJIZWxsb0hhbmRsZXJcIiwge1xuICAgIC8vICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE4X1gsIC8vIGV4ZWN1dGlvbiBlbnZpcm9ubWVudFxuICAgIC8vICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KFwibGFtYmRhXCIpLCAvLyBjb2RlIGxvYWRlZCBmcm9tIFwibGFtYmRhXCIgZGlyZWN0b3J5LlxuICAgIC8vICAgaGFuZGxlcjogJ2hlbGxvLmhhbmRsZXInLCAvLyBmaWxlIGlzIFwiaGVsbG9cIiwgZnVuY3Rpb24gaXMgXCJoYW5kbGVyXCJcbiAgICAvLyB9KTtcbiAgfVxufVxuIl19