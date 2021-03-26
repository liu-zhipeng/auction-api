import { getFormattedToken } from '../utils/token'

const nftMiddleware = () => async (req, res) => {
  const tokenId = parseInt(req.params.tokenId)
  const token = await getFormattedToken(tokenId)

  if (!token) {
    return res.sendStatus(404)
  }

  res.send(token)
}

export default nftMiddleware
