import TokenMetadata from '../../models/TokenMetadata'
import { formatTokenMetadata } from '../../formatters/token-metadata'

const tokenMetadataCreate = async (_, args) => {
  const {
    id,
    name,
    artistName,
    genre,
    description,
    artworkBucketFolder,
    artworkBucketName,
    artworkFileBucketLocation,
    artworkUniqueFileName,
    audioBucketFolder,
    audioBucketName,
    audioFileBucketLocation,
    audioUniqueFileName
  } = args.input

  const newTokenMetadata = await TokenMetadata
    .create({
      tokenId: parseInt(id),
      name,
      artistName,
      genre,
      description,
      artworkBucketFolder,
      artworkBucketName,
      artworkFileBucketLocation,
      artworkUniqueFileName,
      audioBucketFolder,
      audioBucketName,
      audioFileBucketLocation,
      audioUniqueFileName
    })

  return formatTokenMetadata(newTokenMetadata)
}

export default tokenMetadataCreate
