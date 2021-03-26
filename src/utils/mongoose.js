import mongoose from 'mongoose'
import { MONGO_URI } from '../config'

export const connectMongoose = async () => {
  if (mongoose?.connections?.[0].readyState) {
    return
  }

  // @see https://mongoosejs.com/docs/connections.html
  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    poolSize: 5,
    socketTimeoutMS: 30000,
    promiseLibrary: global.Promise
  })
}
