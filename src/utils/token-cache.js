import LRU from 'lru-cache'

const _tokenCache = new LRU({
  max: 500,
  length: (n, key) => {
    return n * 2 + key.length
  },
  dispose: (key, n) => {
    n.close()
  },
  maxAge: 1000 * 60 * 60
})

export const getTokenCached = tokenId => {
  return _tokenCache(tokenId)
}

export const setTokenCached = (tokenId, token) => {
  _tokenCache.set(tokenId, token)
}
