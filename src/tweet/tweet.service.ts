import { prisma } from '@/lib/prisma-client'

import { TweetForm, TweetResponse } from './tweet.types'

export default class TweetService {
  private prisma = prisma

  async createOne(tweet: TweetForm): Promise<TweetResponse> {
    return this.prisma.tweet.create({
      data: tweet,
    })
  }

  async getAll(): Promise<TweetResponse[]> {
    return this.prisma.tweet.findMany()
  }
}
