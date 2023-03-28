import React from 'react'
import Feed from '../../components/feed/feed'
import TweetBox from '../../components/feed/tweetbox'
import './home.css'

function Home() {
  return (
    <div className="home">
      <TweetBox />
      <Feed />
    </div>
  )
}

export default Home
