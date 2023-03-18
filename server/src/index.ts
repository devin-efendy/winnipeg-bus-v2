import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { getNearbyStops } from './controller'

const app = express()

const appUrl = process.env.APP_URL
const port = process.env.PORT || 3000

app.options('*', cors()) // include before other routes
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  return res.status(200).json('Winnipeg Transit Live API')
})

app.get('/stops/nearby', getNearbyStops)

app.get('/status', async (req, res) => {
  return res.status(200).json({ statusCode: '200' })
})

app.listen(port, () => {
  console.log(`Server is up on port ${appUrl}:${port}`)
})
