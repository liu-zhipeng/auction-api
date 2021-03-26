import TokenMetadata from '../../models/TokenMetadata'
import { formatTokenMetadata } from '../../formatters/token-metadata'

const tokenMetadata = async (_, args) => {
  const tokenMetadata = await TokenMetadata
    .findOne({
      tokenId: parseInt(args.tokenId)
    })
    .lean()
    .exec()

  if (!tokenMetadata) {
    return null
  }

  return formatTokenMetadata(tokenMetadata)
}

export default tokenMetadata
