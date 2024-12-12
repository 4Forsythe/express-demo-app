import { z } from 'zod'
import { Tweet } from '@prisma/client'

import { tweetSchema } from './tweet.schema'

export type TweetForm = z.infer<typeof tweetSchema>
export type TweetResponse = Tweet
