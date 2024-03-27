import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { PreSignUpTriggerEvent } from "aws-lambda";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "ems_blocked_users";

export const handler = async (event: PreSignUpTriggerEvent, context: any, callback: any) => {
  console.log(event)

  let data = await dynamo.send(
    new GetCommand({
      TableName: tableName,
      Key: {
        email: event.request.userAttributes.email,
      },
    })
  );
  console.log(data);
  if (data.Item!== undefined) {
    var error = new Error("User is blocked by administrator");
    console.log(error);
    callback(error, event);
  }

  console.log("User is not blocked");
  callback(null, event);

}
