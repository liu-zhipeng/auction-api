import mongoose from 'mongoose'

const tokenMetadataSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  // Artwork
  artworkBucketFolder: {
    type: String,
    required: true
  },
  artworkBucketName: {
    type: String,
    required: true
  },
  artworkFileBucketLocation: {
    type: String,
    required: true
  },
  artworkUniqueFileName: {
    type: String,
    required: true
  },

  // Audio
  audioBucketFolder: {
    type: String,
    required: true
  },
  audioBucketName: {
    type: String,
    required: true
  },
  audioFileBucketLocation: {
    type: String,
    required: true
  },
  audioUniqueFileName: {
    type: String,
    required: true
  },

  // Misc
  created: {
    type: Date,
    default: Date.now
  },
  changed: {
    type: Date,
    default: Date.now
  }
})

tokenMetadataSchema.pre('save', function (callback) {
  this.changed = new Date()
  callback()
})

const TokenMetadata = mongoose.model('Token', tokenMetadataSchema)

export default TokenMetadata
