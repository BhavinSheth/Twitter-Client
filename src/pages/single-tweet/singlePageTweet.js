import './singleTweet.css'

import React from 'react'
import { useParams } from 'react-router-dom'
import TweetContainer from '../../components/nested-tweets/TweetContainer'
import { useEffect } from 'react'
import Header from '../../components/common-headers/Header'

function SingleTweetPage() {
  const { tweetId, userName } = useParams()
  return (
    <div className="single-tweet-container">
      <Header headerName="Tweet" />
      <TweetContainer main tweetId={tweetId} userName={userName} showComments />
    </div>
  )
}

export default SingleTweetPage
