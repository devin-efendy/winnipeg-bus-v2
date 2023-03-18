import { TransitApiConfig } from '../config'
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

async function getNearbyStops(req: Request, res: Response) {
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

  const queryParams: string = new URLSearchParams(params).toString()

  const transitRes = await fetch(`${apiUrl}?${queryParams}`)
  const nearbyStops = (await transitRes.json())['stops']

  const stops = await Promise.all(
    nearbyStops.map(async (stop: any) => {
      const staticStop = await prisma.stop.findFirst({ where: { stopId: stop.key } })
      const headsign = stop.name.split(' ').slice(1).join(' ')

      return {
        key: stop.key,
        headsign,
        direction: stop.direction,
        location: {
          ...stop.centre.geographic,
        },
        distances: {
          ...stop.distances,
        },
        routes: staticStop?.routes,
      }
    }),
  )

  return res.status(200).json({
    stops,
  })
}

export { getNearbyStops }
