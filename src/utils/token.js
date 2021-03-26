import { getTokenCached, setTokenCached } from './token-cache'
import TokenMetadataModel from '../models/TokenMetadata'
import { formatERC721Metadata } from '../formatters/erc721-metadata'
import UserModel from '../models/User'
import slugify from 'slugify'

export const getTokenSlug = (tokenId, tokenName) => {
  return `${tokenId}-${slugify(tokenName)}`
}

export const getFormattedToken = async (tokenId) => {
  const tokenCached = getTokenCached(tokenId)

  if (tokenCached) {
    return tokenCached
  }

  const tokenMetadata = await TokenMetadataModel
    .findOne({
      tokenId
    })
    .lean()
    .exec()

  // TODO: make an actual query to the subgraph
  const tokenSubgraph = {
    owner: '0x1111111111111111'
  }

  if (!tokenMetadata || !tokenSubgraph) {
    return null
  }

  const tokenOwner = await UserModel
    .findOne({
      publicAddress: tokenSubgraph.owner
    })
    .lean()
    .exec()

  const formattedToken = formatERC721Metadata({
    tokenMetadata,
    tokenSubgraph,
    tokenOwner
  })

  setTokenCached(tokenId, formattedToken)

  return formattedToken
}
