// event CreateToken(
//   uint256 timestamp,
//   address indexed owner,
//   uint256 indexed tokenId,
//   uint256 royalty
// );
//
// event AuctionCreate(
//   uint256 timestamp,
//   address indexed owner,
//   uint256 indexed tokenId,
//   uint256 reservePrice
// );
//
// event AuctionPlaceBid(
//   uint256 timestamp,
//   address indexed owner,
//   uint256 indexed tokenId,
//   uint256 amount,
//   uint256 deadline
// );
//
// event AuctionClaim(
//   uint256 timestamp,
//   address indexed owner,
//   uint256 indexed tokenId
// );

export const EVENT_CREATE_TOKEN = 'CreateToken'
export const EVENT_AUCTION_CREATE = 'AuctionCreate'
export const EVENT_AUCTION_PLACE_BID = 'AuctionPlaceBid'
export const EVENT_AUCTION_CLAIM = 'AuctionClaim'
