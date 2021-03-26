import { s3 } from '../../utils/aws'
import {
  AWS_BUCKET_NAME_IMAGES,
  URL_IMG_ROOT,
  BUCKET_IMAGES_FOLDER_USER_IMAGES,
  BUCKET_IMAGES_FOLDER_ARTWORK,
  AWS_BUCKET_NAME_AUDIO,
  BUCKET_AUDIO_FOLDER_RAW, URL_AUDIO_ROOT
} from '../../config'
import * as FileUploadType from '../../constants/file-upload-type'
import { UserInputError } from 'apollo-server-express'
import shortid from 'shortid'
import path from 'path'

const getUniqueFileName = fileName => {
  const id = shortid()
  const extension = path.extname(fileName)
  return `${id}${extension}`
}

const getSignResponse = ({
  fileName,
  bucketName,
  bucketFolder,
  root
}) => {
  const fileNameUnique = getUniqueFileName(fileName)
  const fileBucketLocation = `${bucketFolder}/${fileNameUnique}`

  const options = {
    Bucket: bucketName,
    Key: fileBucketLocation,
    Expires: 100
  }

  const signedUrl = s3.getSignedUrl('putObject', options)
  const url = `${root}/${bucketFolder}/${fileNameUnique}`

  return {
    bucketName,
    bucketFolder,
    uniqueFileName: fileNameUnique,
    fileBucketLocation,
    signedUrl,
    url
  }
}

const signFileUpload = async (_, args) => {
  const fileName = args.fileName

  switch (args.type) {
    case FileUploadType.USER_IMAGE:
      return getSignResponse({
        fileName,
        bucketName: AWS_BUCKET_NAME_IMAGES,
        bucketFolder: BUCKET_IMAGES_FOLDER_USER_IMAGES,
        root: URL_IMG_ROOT
      })
    case FileUploadType.ARTWORK:
      return getSignResponse({
        fileName,
        bucketName: AWS_BUCKET_NAME_IMAGES,
        bucketFolder: BUCKET_IMAGES_FOLDER_ARTWORK,
        root: URL_IMG_ROOT
      })
    case FileUploadType.AUDIO:
      return getSignResponse({
        fileName,
        bucketName: AWS_BUCKET_NAME_AUDIO,
        bucketFolder: BUCKET_AUDIO_FOLDER_RAW,
        root: URL_AUDIO_ROOT
      })
    default:
      throw new UserInputError('Not supported')
  }
}

export default signFileUpload
