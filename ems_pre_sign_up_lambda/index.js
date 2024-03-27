import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "ems_blocked_users";
export const handler = async (event, context, callback) => {
    let data = await dynamo.send(new GetCommand({
        TableName: tableName,
        Key: {
            id: event.request.userAttributes.email,
        },
    }));
    let body = data.Item;
    console.log("body");
    console.log(body);
    callback(null, event);
};
