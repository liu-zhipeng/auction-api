/**
 * Not to be confused with the token-metadata formatter, which is purely a formatter for the Mongoose model
 * TokenMetadata, this formatter is directly the ERC721 metadata standard output
 *
 * @see https://docs.opensea.io/docs/metadata-standards
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
 */

import * as config from '../config'
import slugify from 'slugify'

export const formatERC721Metadata = ({
  tokenMetadataFormatted,
  tokenSubgraph,
  tokenOwner
}) => {
  const slug = slugify(tokenMetadataFormatted.name)
  const tokenOwnerUsername = tokenOwner.username || tokenOwner.publicAddress

  return {
    name: tokenSubgraph.name,
    description: tokenMetadataFormatted.description,
    external_url: `${config.WEB_URL}/${tokenOwnerUsername}/${slug}`,
    image: tokenMetadataFormatted.artworkUri, // TODO: this should be 350x350
    animation_url: tokenMetadataFormatted.audioOptimizedUri,
    attributes: [{
      trait_type: 'Artist',
      value: tokenMetadataFormatted.artistName
    }, {
      trait_type: 'Genre',
      value: tokenMetadataFormatted.genre // TODO: genre is a constant value, should be a human friendly version here
    }, {
      trait_type: 'Royalties',
      value: tokenSubgraph.royalties
    }, {
      trait_type: 'High Quality Audio URI',
      value: tokenMetadataFormatted.audioUri
    }]
  }
}
