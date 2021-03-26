import createNonceGenerator from 'nonce'
const nonceGenerator = createNonceGenerator()

export const createNonce = () => {
  return nonceGenerator()
}
