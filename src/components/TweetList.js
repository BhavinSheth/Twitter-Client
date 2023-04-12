import React from 'react'
import Tweet from './nested-tweets/Tweet'

function TweetList({ tweets }) {
  return (
    <div className="tweet-list">
      {tweets.map((tweet) => {
        return <Tweet key={tweet._id} {...tweet} />
      })}
    </div>
  )
}

export default TweetList
