import { PutCommand, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "./db";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

function json(statusCode: number, body: Record<string, unknown>): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  const routeKey = event.routeKey;

  if (routeKey === "POST /blog") {
    const { title, slug } = JSON.parse(event.body || "{}");

    if (!title || !slug) {
      return json(400, { error: "title and slug are required" });
    }

    try {
      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: { slug, title, views: 0 },
          ConditionExpression: "attribute_not_exists(slug)",
        }),
      );
      return json(200, { slug, views: 0 });
    } catch (err: any) {
      if (err.name === "ConditionalCheckFailedException") {
        return json(409, { error: "Post with this slug already exists", slug });
      }
      throw err;
    }
  }

  if (routeKey === "PATCH /blog/{slug}") {
    const slug = event.pathParameters?.slug;
    if (!slug) {
      return json(400, { error: "slug is required" });
    }

    const ip = event.requestContext.http.sourceIp;

    try {
      const result = await docClient.send(
        new UpdateCommand({
          TableName: TABLE_NAME,
          Key: { slug },
          UpdateExpression: "ADD viewerIps :ipSet, #v :inc",
          ConditionExpression:
            "attribute_exists(slug) AND (attribute_not_exists(viewerIps) OR NOT contains(viewerIps, :ip))",
          ExpressionAttributeNames: { "#v": "views" },
          ExpressionAttributeValues: {
            ":ipSet": new Set([ip]),
            ":inc": 1,
            ":ip": ip,
          },
          ReturnValues: "ALL_NEW",
        }),
      );
      return json(200, { slug, views: result.Attributes?.views ?? 0 });
    } catch (err: any) {
      if (err.name === "ConditionalCheckFailedException") {
        try {
          const item = await docClient.send(
            new GetCommand({ TableName: TABLE_NAME, Key: { slug } }),
          );
          if (!item.Item) {
            return json(404, { error: "Post not found" });
          }
          return json(200, { slug, views: item.Item.views ?? 0 });
        } catch {
          throw err;
        }
      }
      throw err;
    }
  }

  return json(404, { error: "Not found" });
}
