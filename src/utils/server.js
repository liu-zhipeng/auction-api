import app from './app'
import { PORT } from '../config'

export const startServer = () => new Promise(resolve => {
  app.listen(PORT, () => {
    resolve()
  })
})
