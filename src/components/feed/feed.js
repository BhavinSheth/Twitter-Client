import React from 'react'
import './feed.css'
import TweetBox from './tweetbox'
import Post from './post'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { SERVER_BASE_URL } from '../../context/globalConstants'
import { toast } from 'react-toastify'
import Tweet from '../nested-tweets/Tweet'

function Feed() {
  const [posts, setPosts] = useState([])

  console.log('in feed')

  const getHomePageTweets = async () => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/home`)
      setPosts(res.data)
      console.log(res)
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    getHomePageTweets()
  }, [])

  return (
    <div className="feed">
      <div className="post-container">
        {posts.length > 0 &&
          posts.map((post) => {
            // return <Post {...post} />
            return <Tweet {...post} />
          })}
      </div>
    </div>
  )
}

export default Feed
