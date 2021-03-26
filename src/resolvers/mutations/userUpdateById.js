import UserModel from '../../models/User'
import formatUser from '../../formatters/user'
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import emailValidator from 'email-validator'

const getHasPermission = (id, context) => {
  if (context.user.isAdmin) {
    return true
  }

  return id === context.user._id.toString()
}

const MAX_BIO_LENGTH = 200

const userUpdateById = async (_, args, context) => {
  const input = args.input
  const updatingUserId = input.id

  const hasPermission = getHasPermission(updatingUserId, context)

  if (!hasPermission) {
    throw new AuthenticationError('Not allowed')
  }

  const user = await UserModel
    .findById(updatingUserId)
    .lean()
    .exec()

  if (!user) {
    throw new UserInputError('User not found')
  }

  const updatedUserFields = [
    'email',
    'name',
    'links'
  ].reduce((acc, fieldName) => {
    if (input?.[fieldName]) {
      acc[fieldName] = input[fieldName]
    }

    return acc
  }, {})

  if (input.bio) {
    if (input.bio.length > MAX_BIO_LENGTH) {
      throw new UserInputError(`Bio exceeds the max length of ${MAX_BIO_LENGTH}`)
    }

    updatedUserFields.bio = input.bio
  }

  if (input.email) {
    const isValidEmail = emailValidator.validate(input.email)

    if (!isValidEmail) {
      throw new UserInputError('Email is not valid')
    }

    updatedUserFields.email = input.email
  }

  // Remove the avatar
  if (input.image !== undefined && input.image === null) {
    updatedUserFields.image = null
  } else if (input.image !== undefined) {
    updatedUserFields.image = input.image
  }

  if (input.username) {
    const userByUsername = await UserModel
      .findOne({
        username: input.username
      })
      .lean()
      .exec()

    if (userByUsername) {
      throw new UserInputError('username already in use')
    }

    // TODO: add username validation
    updatedUserFields.username = input.username
  }

  if (input.links) {
    // TODO: add link validation
    updatedUserFields.links = input.links
  }

  const updatedUser = await UserModel
    .findByIdAndUpdate(updatingUserId, {
      $set: updatedUserFields
    }, {
      new: true
    })
    .lean()
    .exec()

  return formatUser(updatedUser, context)
}

export default userUpdateById
