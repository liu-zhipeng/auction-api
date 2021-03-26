import formatUser from '../../formatters/user'

const session = async (_, args, context) => {
  return {
    user: formatUser(context.user)
  }
}

export default session
