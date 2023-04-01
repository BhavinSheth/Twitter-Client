import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { SERVER_BASE_URL } from '../../context/globalConstants'
import Tweet from './Tweet'
import MainTweet from './MainTweet'

function TweetContainer({ main, showComments, tweetId, userName, child }) {
  const [localTweet, setLocalTweet] = useState()

  const getSingleTweet = async () => {
    try {
      const res = await axios.get(
        `${SERVER_BASE_URL}/${userName}/status/${tweetId}`
      )
      console.log(res.data)
      setLocalTweet(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSingleTweet()
  }, [tweetId])

  return (
    <>
      {localTweet && localTweet.parentPost && (
        <TweetContainer
          userName={userName}
          tweetId={localTweet.parentPost}
          child={true}
        />
      )}

      {localTweet &&
        (main ? (
          <MainTweet
            {...localTweet}
            parent={localTweet.parentPost && true}
            child={child && true}
          />
        ) : (
          <Tweet
            {...localTweet}
            parent={localTweet.parentPost && true}
            child={child && true}
          />
        ))}

      {showComments &&
        localTweet &&
        localTweet.comments.map((comment, index) => {
          return <Tweet key={index} {...comment} />
        })}
    </>
  )
}

export default TweetContainer
