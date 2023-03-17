import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { TransitApiConfig } from './config'

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

app.get('/stops/nearby', async (req, res) => {
  if (!req.query?.lat || !req.query?.lon) {
    return res.status(400).json({ error: 'lat and lon query parameters are required.' })
  }

  const { lat, lon } = req.query

  const apiUrl = `${TransitApiConfig.Url}/stops.json`

  const params = {
    'api-key': TransitApiConfig.Secret,
    lat: lat as string,
    lon: lon as string,
    distance: '1000',
    walking: 'true',
  }

  const queryParams = new URLSearchParams(params).toString()

  const transitRes = await fetch(`${apiUrl}?${queryParams}`)
  const nearbyStops = (await transitRes.json())['stops']

  return res.status(200).json({
    stops: nearbyStops,
  })
})

app.get('/status', async (req, res) => {
  return res.status(200).json({ statusCode: '200' })
})

app.listen(port, () => {
  console.log(`Server is up on port ${appUrl}:${port}`)
})
