import './singleTweet.css'

import React from 'react'
import { useParams } from 'react-router-dom'
import TweetContainer from '../../components/nested-tweets/TweetContainer'

function SingleTweetPage() {
  const { tweetId, userName } = useParams()

  return (
    <div className="single-tweet-container">
      <TweetContainer main tweetId={tweetId} userName={userName} />
    </div>
  )
}

export default SingleTweetPage
