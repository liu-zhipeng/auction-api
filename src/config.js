import yn from 'yn'
import { version } from '../package.json'

export const VERSION = version
export const NAME = process.env.NAME
export const HAS_PLAYGROUND = yn(process.env.HAS_PLAYGROUND)
export const DEBUG = process.env.DEBUG
export const TRACING = yn(process.env.TRACING)
export const CACHE_IN_MEMORY_MAX_SIZE = parseInt(process.env.CACHE_IN_MEMORY_MAX_SIZE)
export const NODE_ENV = process.env.NODE_ENV
export const LOG_LEVEL = process.env.LOG_LEVEL
export const PORT = process.env.PORT
export const MONGO_URI = process.env.MONGO_URI
export const SENTRY_DSN = process.env.SENTRY_DSN
export const URL = process.env.URL
export const WEB_URL = process.env.WEB_URL
export const JWT_SECRET = process.env.JWT_SECRET
export const AWS_REGION = process.env.AWS_REGION
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
export const AWS_BUCKET_NAME_IMAGES = process.env.AWS_BUCKET_NAME_IMAGES
export const AWS_BUCKET_NAME_AUDIO = process.env.AWS_BUCKET_NAME_AUDIO
export const IMGIX_SECURE_TOKEN = process.env.IMGIX_SECURE_TOKEN
export const IMGIX_DOMAIN = process.env.IMGIX_DOMAIN
export const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID
export const CHAIN_NAME = process.env.CHAIN_NAME
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

export const URL_IMG_ROOT = 'https://triptcip.imgix.net'
export const URL_AUDIO_ROOT = 'https://sound.triptcip.com'

export const BUCKET_IMAGES_FOLDER_USER_IMAGES = 'user-images'
export const BUCKET_IMAGES_FOLDER_ARTWORK = 'artwork'

export const BUCKET_AUDIO_FOLDER_RAW = 'raw'
export const BUCKET_AUDIO_FOLDER_TRANSCODED = 'transcoded'

export const ADMIN_WHITELIST = [

  // Mike's public address
  '0xa81bb6074d3fa1f69e24bb3e7dc0329677ffbb60'
]
