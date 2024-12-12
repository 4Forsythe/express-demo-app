import { z } from 'zod'

export const tweetSchema = z.object({
  body: z.string().min(1, 'Body is required').max(7500, 'Body is too long'),
})
