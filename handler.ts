'use strict';

import { MessageService } from "./services/message.service";
import { createPresignedPost }  from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
const messageService = new MessageService();

const client = new S3Client({ region: process.env.REGION });

export async function getPreSignedURLToPostS3(event) {
    let requestObject = JSON.parse(event["body"]);

    const originalName = requestObject.fileName;
    const fileType = requestObject.fileType;
    const myBucket = process.env.BUCKET_NAME;

    try {
        const params = messageService.uploadMessageFile({ originalName, fileType, myBucket });
        const data = await createPresignedPost(client, params);

        return {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        }
    } catch (e) {
        return {
            statusCode: e.statusCode,
            body: JSON.stringify(e),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        }
    }
}
