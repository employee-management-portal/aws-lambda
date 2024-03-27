import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { PreTokenGenerationTriggerEvent } from "aws-lambda";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "ems_temporary_block_user";

export const handler = async (event:PreTokenGenerationTriggerEvent, context:any, callback:any) => {

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
    var error = new Error("User is temporary blocked by administrator");
    console.log(error);
    callback(error, event);
  }
  console.log("User is not blocked");

  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        userName: event.userName,
      },
    },
  };
  console.log(event);
  return event;
};
