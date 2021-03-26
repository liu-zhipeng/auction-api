import { AuthenticationError } from 'apollo-server-express'
import { recoverPersonalSignature } from 'eth-sig-util'
import { bufferToHex } from 'ethereumjs-util'
import { createToken } from '../../utils/jwt'
import UserModel from '../../models/User'
import { createNonce } from '../../utils/nonce'

export const getSignedMessage = nonce => {
  return `Sign this message to connect to Triptcip. ${nonce}`
}

const auth = async (_, args) => {
  const { publicAddress, signature } = args.input

  const user = await UserModel
    .findOne({
      publicAddress
    })
    .lean()
    .exec()

  if (!user) {
    return null
  }

  const expectedMessage = getSignedMessage(user.nonce)
  const msgBufferHex = bufferToHex(Buffer.from(expectedMessage, 'utf8'))
  const address = recoverPersonalSignature({
    data: msgBufferHex,
    sig: signature
  })

  if (address.toLowerCase() !== publicAddress.toLowerCase()) {
    throw new AuthenticationError('Signature verification failed.')
  }

  const newNonce = createNonce()

  // Generate a new nonce for the user
  const newUser = await UserModel
    .findOneAndUpdate({
      publicAddress
    }, {
      nonce: newNonce
    }, {
      new: true
    })
    .lean()
    .exec()

  const accessToken = createToken({
    publicAddress,
    userId: newUser._id.toString()
  })

  return {
    accessToken
  }
}

export default auth
