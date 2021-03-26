import { gql } from 'apollo-server-express'

export const typeDefs = gql`

  directive @auth(
    isAdmin: Boolean
  ) on FIELD_DEFINITION

  enum Genre {
    TECHNO,
    HOUSE,
    TECH_HOUSE,
    DEEP_HOUSE,
    DISCO,
    ELECTRO,
    MINIMAL_TECHNO,
    HARD_TECHNO,
    UK_GARAGE,
    PROGRESSIVE_HOUSE,
    EDM,
    TRANCE,
    PSYTRANCE,
    FUTURE_HOUSE,
    HIPHOP,
    TRAP,
    RNB,
    GLITCH_HOP,
    DOWNTEMPO,
    AMBIENT,
    SYNTHWAVE,
    IDM,
    EXPERIMENTAL,
    TRIPHOP,
    FOOTWORK,
    DNB,
    JUNGLE,
    DRUMSTEP,
    BREAKBEAT,
    DUBSTEP,
    GRIME,
    LEFTFIELD_BASS
  }

  enum LinkType {
    WEB
    INSTAGRAM
    TWITTER
    DISCORD
    YOUTUBE
    TWITCH
    SOUNDCLOUD
    SPOTIFY
    TIKTOK
    FACEBOOK
  }

  type User {
    id: ID!
    publicAddress: String!
    nonce: String
    email: String
    bio: String
    username: String!
    isCreator: Boolean
    isAdmin: Boolean
    name: String
    image: String
    links: [Link]
  }

  type TokenMetadata {
    id: ID!
    name: String!
    slug: String!
    artistName: String!
    genre: Genre!
    description: String!
    artworkUri: String!
    audioUri: String!
    audioOptimizedUri: String!
  }

  type Link {
    type: LinkType!
    link: String!
  }

  input InputUserCreate {
    publicAddress: String!
  }

  input InputAuth {
    signature: String!
    publicAddress: String!
  }

  input InputLink {
    type: LinkType!
    link: String!
  }

  input InputUserUpdate {
    id: ID!
    email: String
    username: String
    name: String
    bio: String
    image: String
    links: [InputLink!]
  }

  input InputTokenMetadataCreate {
    id: ID!
    name: String!
    artistName: String!
    genre: Genre!
    description: String!
    artworkBucketFolder: String!
    artworkBucketName: String!
    artworkFileBucketLocation: String!
    artworkUniqueFileName: String!
    audioBucketFolder: String!
    audioBucketName: String!
    audioFileBucketLocation: String!
    audioUniqueFileName: String!
  }

  type ResponseAuth {
    accessToken: String
  }

  type ResponseSession {
    user: User
  }

  type ResponseUser {
    user: User
  }

  type ResponseSignFileUpload {
    bucketName: String!
    bucketFolder: String!
    uniqueFileName: String!
    fileBucketLocation: String!
    signedUrl: String!
    url: String!
  }

  enum FileUploadType {
    USER_IMAGE
    ARTWORK
    AUDIO
  }

  type Query {
    userByPublicAddress(publicAddress: String!): User
    userByUsername(username: String!): User
    isUsernameAvailable(candinate: String!): Boolean @auth
    session: ResponseSession @auth
    tokenMetadata(tokenId: ID!): TokenMetadata
  }

  type Mutation {
    userCreate(
      input: InputUserCreate!
    ): User!

    auth(
      input: InputAuth!
    ): ResponseAuth!

    userUpdateById(
      input: InputUserUpdate!
    ): User! @auth

    signFileUpload(
      fileName: String!
      type: FileUploadType!
    ): ResponseSignFileUpload! @auth

    setUserIsCreator(
      isCreator: Boolean!
      userId: ID!
    ): Boolean @auth(isAdmin: true)

    tokenMetadataCreate(
      input: InputTokenMetadataCreate!
    ): TokenMetadata @auth
  }
`
