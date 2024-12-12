import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import { prisma } from './lib/prisma-client'
import { logger } from './config/logger.config'

import TweetController from './tweet/tweet.controller'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 80

app.use(bodyParser.json())

async function main() {
  app.get('/', (req, res) => {
    res.send('Server is running now.')
  })

  app.use('/tweets', TweetController)

  app.all('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Cannot found route / endpoint',
    })
  })

  app.use((err: Error, req: Request, res: Response) => {
    logger.error(err.stack)
    res.status(500).send('Woops! Something error...')
  })

  app.listen(PORT, () => {
    logger.info(`Server is running at ${PORT} port.`)
  })
}

main()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async (err) => {
    logger.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
