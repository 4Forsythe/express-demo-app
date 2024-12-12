import TweetService from './tweet.service'

describe('TweetService', () => {
  const sayHi = 'Hello world'
  const tweetService = new TweetService()

  it('should create a tweet', async () => {
    const tweet = await tweetService.createOne({
      body: sayHi,
    })

    expect(tweet).toHaveProperty('id')
    expect(tweet.body).toEqual(sayHi)
  })
})
