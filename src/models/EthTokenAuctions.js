import mongoose from 'mongoose'
import UserModel from './User'

const ethTokenAuctionsSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  owner: {
    type: String,
    required: true,
    index: true,
    ref: 'User'
  },
  genre: {
    type: String,
    required: true
  },
  deadline: {
    type: Number,
    required: true
  },
  reservePrice: {
    type: Number,
    required: true
  },

  highestBid: {
    type: String,
  },

  bids: [{
    amount: {
      type: String,
      required: true
    },
    creator : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],

  // Token Info
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TokenMetadata'
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

ethTokenAuctionsSchema.pre('save', function (callback) {
  this.changed = new Date()
  callback()
})

const ethTokenAuctions = mongoose.model('EthTokenAuctions', ethTokenAuctionsSchema)

export default EthTokens
