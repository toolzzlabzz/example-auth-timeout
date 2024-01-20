import Env from '@ioc:Adonis/Core/Env'

import { S3 } from "@aws-sdk/client-s3";
export const s3 = new S3({
    apiVersion: "2006-03-01",

    credentials: {
        accessKeyId: Env.get('S3_KEY'),
        secretAccessKey: Env.get('S3_SECRET'),

    },
    region: Env.get('S3_REGION'),
    endpoint: Env.get('S3_ENDPOINT'),
})