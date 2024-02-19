import { GetCostAndUsageCommandOutput } from "@aws-sdk/client-cost-explorer";

export const sampleCostExplorerDateRange = [
  new Date("2024-02-01"),
  new Date("2024-02-02"),
  new Date("2024-02-03"),
  new Date("2024-02-04"),
  new Date("2024-02-05"),
  new Date("2024-02-06"),
  new Date("2024-02-07"),
]

export const sampleCostExplorerResponse : GetCostAndUsageCommandOutput = {
    $metadata: {
      httpStatusCode: 200,
      requestId: "11111111-1111-1111-1111-111111111111",
      extendedRequestId: undefined,
      cfId: undefined,
      attempts: 1,
      totalRetryDelay: 0,
    },
    DimensionValueAttributes: [
    ],
    GroupDefinitions: [
      {
        Key: "SERVICE",
        Type: "DIMENSION",
      },
    ],
    ResultsByTime: [
      {
        Estimated: false,
        Groups: [
          {
            Keys: [
              "AWS CloudTrail",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "1.00",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Config",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.008",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Glue",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Key Management Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Lambda",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Migration Hub Refactor Spaces",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon DynamoDB",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Relational Database Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.002397146",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Route 53",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0001152",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Notification Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Queue Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Storage Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0437846218",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AmazonCloudWatch",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "CloudWatch Events",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0000422137",
                Unit: "USD",
              },
            },
          },
        ],
        TimePeriod: {
          End: "2024-02-01",
          Start: "2024-01-31",
        },
        Total: {
        },
      },
      {
        Estimated: true,
        Groups: [
          {
            Keys: [
              "AWS CloudTrail",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "2.00",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Config",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.008",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Glue",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Key Management Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Lambda",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Migration Hub Refactor Spaces",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon DynamoDB",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Relational Database Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0025624664",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Route 53",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "1.0001088",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Notification Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Queue Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Storage Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0447742857",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AmazonCloudWatch",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "CloudWatch Events",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.000043363",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Tax",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
        ],
        TimePeriod: {
          End: "2024-02-02",
          Start: "2024-02-01",
        },
        Total: {
        },
      },
      {
        Estimated: true,
        Groups: [
          {
            Keys: [
              "AWS CloudTrail",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "3.00",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Config",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.008",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Glue",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Key Management Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Lambda",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Migration Hub Refactor Spaces",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon DynamoDB",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Relational Database Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0025624664",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Route 53",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0001612",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Notification Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Queue Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Storage Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0449907245",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AmazonCloudWatch",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "CloudWatch Events",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0000433599",
                Unit: "USD",
              },
            },
          },
        ],
        TimePeriod: {
          End: "2024-02-03",
          Start: "2024-02-02",
        },
        Total: {
        },
      },
      {
        Estimated: true,
        Groups: [
          {
            Keys: [
              "AWS CloudTrail",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "4.00",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Config",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.008",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Glue",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Key Management Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Lambda",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Migration Hub Refactor Spaces",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon DynamoDB",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Relational Database Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0025624664",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Route 53",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0001168",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Notification Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Queue Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Storage Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0445651554",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AmazonCloudWatch",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "CloudWatch Events",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0000434049",
                Unit: "USD",
              },
            },
          },
        ],
        TimePeriod: {
          End: "2024-02-04",
          Start: "2024-02-03",
        },
        Total: {
        },
      },
      {
        Estimated: true,
        Groups: [
          {
            Keys: [
              "AWS CloudTrail",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "2.00",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Config",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.008",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Glue",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Key Management Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Lambda",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Migration Hub Refactor Spaces",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon DynamoDB",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Relational Database Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0025624664",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Route 53",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.000132",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Notification Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Queue Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Storage Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.043408211",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AmazonCloudWatch",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "CloudWatch Events",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0000433968",
                Unit: "USD",
              },
            },
          },
        ],
        TimePeriod: {
          End: "2024-02-05",
          Start: "2024-02-04",
        },
        Total: {
        },
      },
      {
        Estimated: true,
        Groups: [
          {
            Keys: [
              "AWS CloudTrail",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "5.00",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Config",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.008",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Glue",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Key Management Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Lambda",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Migration Hub Refactor Spaces",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon DynamoDB",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Relational Database Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0025624664",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Route 53",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.000096",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Notification Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Queue Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Storage Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0443399257",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AmazonCloudWatch",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "CloudWatch Events",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0000434286",
                Unit: "USD",
              },
            },
          },
        ],
        TimePeriod: {
          End: "2024-02-06",
          Start: "2024-02-05",
        },
        Total: {
        },
      },
      {
        Estimated: true,
        Groups: [
          {
            Keys: [
              "AWS CloudTrail",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "4.00",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Config",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.008",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Cost Explorer",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.01",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Glue",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Key Management Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Lambda",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AWS Migration Hub Refactor Spaces",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon DynamoDB",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Relational Database Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0025624664",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Route 53",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0001044",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Notification Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Queue Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "Amazon Simple Storage Service",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0443171567",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "AmazonCloudWatch",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0",
                Unit: "USD",
              },
            },
          },
          {
            Keys: [
              "CloudWatch Events",
            ],
            Metrics: {
              BlendedCost: {
                Amount: "0.0000434628",
                Unit: "USD",
              },
            },
          },
        ],
        TimePeriod: {
          End: "2024-02-07",
          Start: "2024-02-06",
        },
        Total: {
        },
      },
    ],
  }