import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema({
  lastBlockNumberSynced: {
    type: Number,
    required: true,
    unique: true,
    index: true
  }
})

const SettingsModel = mongoose.model('Settings', settingsSchema)

export default SettingsModel
