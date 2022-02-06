import mongoose from 'mongoose'
import dotenv from 'dotenv'
import createApp from './app'

(async () => {
  try {
    dotenv.config()
    createApp()
    const db = process.env.CONNECTION_URL
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.info(`Connected to ${db} ...`))
      .catch((error) => console.log(error.message))
  } catch (error) {
    console.log(error)
  }
})()
