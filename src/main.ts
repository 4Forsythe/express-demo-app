import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import { prisma } from './lib/prisma-client'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 80

app.use(bodyParser.json())

async function main() {
  app.get('/', (req, res) => {
    res.send('Server is running now.')
  })

  app.all('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Cannot found route / endpoint',
    })
  })

  app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack)
    res.status(500).send('Woops! Something error...')
  })

  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} port.`)
  })
}

main()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
