import { Request, Response, Router } from 'express'

import { tweetSchema } from './tweet.schema'

import TweetService from './tweet.service'

const router = Router()

const tweetService = new TweetService()

router.post('/', async (req: Request, res: Response) => {
  const { body } = req.body

  const validation = tweetSchema.safeParse(body)

  if (!validation.success) {
    return res.status(400).json({
      status: 400,
      message: validation.error.errors[0].message,
    })
  }

  const tweet = await tweetService.createOne(req.body)
  return res.status(201).json(tweet)
})

router.get('/', async (req: Request, res: Response) => {
  const tweets = tweetService.getAll()
  return res.status(200).json(tweets)
})

export default router
