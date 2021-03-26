import jwt from 'jsonwebtoken'
import * as config from '../config'

const TOKEN_LIFE_TIME = '7d'

export const createToken = ({
  userId,
  publicAddress
}) => new Promise((resolve, reject) => {
  jwt.sign({
    userId,
    publicAddress
  }, config.JWT_SECRET, {
    expiresIn: TOKEN_LIFE_TIME
  }, (error, token) => {
    if (error) {
      return reject(error)
    }

    resolve(token)
  })
})

export const getDecodedToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, config.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return reject(error)
    }

    if (!decodedToken.exp || !decodedToken.iat) {
      return reject(new Error('Token had no \'exp\' or \'iat\' payload'))
    }

    resolve(decodedToken)
  })
})
