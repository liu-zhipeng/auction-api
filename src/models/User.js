import mongoose from 'mongoose'
import { createNonce } from '../utils/nonce'
import * as LinkType from '../constants/link-type'

const userSchema = new mongoose.Schema({
  publicAddress: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  nonce: {
    type: String,
    default: createNonce,
    unique: true
  },
  email: {
    type: String
  },
  username: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  image: {
    type: String
  },
  name: {
    type: String
  },
  bio: {
    type: String
  },
  links: [{
    type: {
      type: String,
      enum: Object.values(LinkType),
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }],
  lastLoggedIn: {
    type: Date,
    default: Date.now
  },
  isCreator: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  changed: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('save', function (callback) {
  this.changed = new Date()
  callback()
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
