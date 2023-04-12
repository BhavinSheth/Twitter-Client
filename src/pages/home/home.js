import React from 'react'
import Feed from '../../components/feed/feed'
import TweetBox from '../../components/feed/tweetbox'
import './home.css'
import Header from '../../components/common-headers/Header'

function Home() {
  return (
    <div className="home">
      <Header headerName={'home'} />
      <TweetBox btnText={'TWEET'} />
      <Feed />
    </div>
  )
}

export default Home
