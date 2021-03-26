import { getTokenSlug } from '../utils/token'
import { BUCKET_AUDIO_FOLDER_RAW, BUCKET_AUDIO_FOLDER_TRANSCODED, URL_AUDIO_ROOT, URL_IMG_ROOT } from '../config'
import replaceExt from 'replace-ext'

/**
 *
 * Here's how the content would look like coming from `tokenMetadataCreate`
 *
 * id: '14',
 * name: 'Rendez-Vous (SCB edit)',
 * artistName: 'Arkist',
 * genre: 'BREAKBEAT',
 * description: 'Thi sis a tesaldkfjalskjdfklasd flkjas;dfljkaskldjfkajlsdfklasdflk aslkdfjaklsdfkljasdfkjlasjkldfjklasdfasdfasdf',
 * artworkBucketFolder: 'artwork',
 * artworkBucketName: 'triptcip-images',
 * artworkFileBucketLocation: 'artwork/LhWN52Y1e.jpg',
 * artworkUniqueFileName: 'LhWN52Y1e.jpg',
 * audioBucketFolder: 'raw',
 * audioBucketName: 'triptcip-audio',
 * audioFileBucketLocation: 'raw/r_wPqcze8.mp3',
 * audioUniqueFileName: 'r_wPqcze8.mp3'
 */

// Example: https://triptcip.imgix.net/artwork/LhWN52Y1e.jpg
const getArtworkUri = tokenMetadata => {
  return `${URL_IMG_ROOT}/${tokenMetadata.artworkFileBucketLocation}`
}

// Example: https://sound.triptcip.com/raw/r_wPqcze8.mp3
const getAudioUri = tokenMetadata => {
  return `${URL_AUDIO_ROOT}/${BUCKET_AUDIO_FOLDER_RAW}/${tokenMetadata.audioUniqueFileName}`
}

// Example: https://sound.triptcip.com/transcoded/r_wPqcze8.mp3
const getAudioOptimizedUri = tokenMetadata => {
  // We force replace because the transcoder converts ALL file types to `.mp3` 128kbps,
  // so the original `audioUniqueFileName` could be a `.flac` file.
  const forcedMP3UniqueFileName = replaceExt(tokenMetadata.audioUniqueFileName, '.mp3')

  return `${URL_AUDIO_ROOT}/${BUCKET_AUDIO_FOLDER_TRANSCODED}/${forcedMP3UniqueFileName}`
}

export const formatTokenMetadata = (tokenMetadata) => {
  const tokenId = tokenMetadata?.tokenId
  const name = tokenMetadata?.name
  const artistName = tokenMetadata?.artistName
  const genre = tokenMetadata?.genre
  const description = tokenMetadata?.description
  const artworkUri = getArtworkUri(tokenMetadata)
  const audioUri = getAudioUri(tokenMetadata)
  const audioOptimizedUri = getAudioOptimizedUri(tokenMetadata)
  const slug = getTokenSlug(tokenId, name)

  return {
    id: tokenId,
    name,
    slug,
    artistName,
    genre,
    description,
    artworkUri,
    audioUri,
    audioOptimizedUri
  }
}
