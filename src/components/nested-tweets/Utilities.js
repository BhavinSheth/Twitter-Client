import React, { useState } from 'react'

import Comment from '@material-ui/icons/ChatBubbleOutline'
import Retweet from '@material-ui/icons/Repeat'
import Like from '@material-ui/icons/FavoriteBorder'
import Liked from '@material-ui/icons/Favorite'

import { toast } from 'react-toastify'
import { useAppContext } from '../../context/appContext'
import axios from 'axios'
import {
  SERVER_BASE_URL,
  START_SPINNER,
  STOP_SPINNER,
} from '../../context/globalConstants'
import { useEffect } from 'react'

function Utilities({ comments, likes, retweets, tweetId, userName }) {
  const { configs, dispatch, getHomePageTweets, user, homePageTweets } =
    useAppContext()

  const [isLiked, setIsLiked] = useState(false)
  const [isRetweeted, setIsRetweeted] = useState(false)

  const likeComment = async (e) => {
    e.preventDefault()
    dispatch({ type: START_SPINNER })

    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/${userName}/status/${tweetId}/${
          isLiked ? 'unlike' : 'like'
        }`,
        null,
        configs
      )
      getHomePageTweets()
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message)
      console.log(error)
    }
    dispatch({ type: STOP_SPINNER })
  }

  const retweet = async (e) => {
    e.preventDefault()
    dispatch({ type: START_SPINNER })

    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/${userName}/status/${tweetId}/${
          isRetweeted ? 'undoRetweet' : 'retweet'
        }`,
        null,
        configs
      )
      toast.success(`${isRetweeted ? 'retweet undone' : 'retweet succesfull'}`)
      getHomePageTweets()
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message)
      console.log(error)
    }
    dispatch({ type: STOP_SPINNER })
  }

  useEffect(() => {
    setIsLiked(likes.includes(user.userId))
    setIsRetweeted(retweets.includes(user.userId))
  }, [getHomePageTweets])

  return (
    <div className="utilites">
      <div className="icon-container">
        <Comment className="icon" />
        <div className="icon-values">{comments.length} </div>
      </div>

      <div className="icon-container">
        <Retweet
          className={`icon ${isRetweeted && 'active-blue'}`}
          onClick={retweet}
        />
        <div className="icon-values">{retweets.length} </div>
      </div>

      <div className="icon-container">
        {isLiked ? (
          <Liked className={`icon active`} onClick={likeComment} />
        ) : (
          <Like className={`icon`} onClick={likeComment} />
        )}
        <div className="icon-values">{likes.length} </div>
      </div>
    </div>
  )
}

export default Utilities
