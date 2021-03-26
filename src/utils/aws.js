import AWS from 'aws-sdk'
import * as config from '../config'

AWS.config.update({
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY
  },
  region: config.AWS_REGION
})

export const s3 = new AWS.S3({
  signatureVersion: 'v4'
})
