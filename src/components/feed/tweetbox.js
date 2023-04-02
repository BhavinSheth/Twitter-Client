import React, { useState } from 'react'
import './tweetbox.css'
import { Avatar, Button } from '@material-ui/core'
import { useAppContext } from '../../context/appContext'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
  SERVER_BASE_URL,
  START_SPINNER,
  STOP_SPINNER,
  TWEET_MAX_LENGTH,
} from '../../context/globalConstants'
import TextEditor from '../TextEditor'
import axios from 'axios'
import { toast } from 'react-toastify'
const defaultImg = `https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png`

function TweetBox() {
  const [text, setText] = useState('')
  const { user, configs, dispatch } = useAppContext()

  const submitTweet = async (e) => {
    dispatch({ type: START_SPINNER })

    e.preventDefault()

    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/${user.userName}/tweets`,
        { text },
        configs
      )
      toast.success('Tweet created succesfully')
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message)
      console.log(error)
    }

    dispatch({ type: STOP_SPINNER })
  }

  const getColor = () => {
    const remainingLength = TWEET_MAX_LENGTH - text.length
    if (remainingLength <= 0) return 'red'
    if (remainingLength <= 20) return 'yellowgreen'
    return 'var(--twitter-color)'
  }

  const progressBarStyles = {
    root: {
      width: '2.05rem',
    },
    text: {
      fontSize: '2.3rem',
      fill: getColor(),
      color: 'red',
    },
    trail: {
      stroke: '',
    },
    path: {
      stroke: getColor(),
      color: 'red',
    },
  }

  React.useEffect(() => {
    if (text.trim().length === 0) {
      setText('')
    }
    console.log(text, text.length)

    return () => {}
  }, [text])

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox-input">
          <Avatar src={`${user && user.profileImg}`}></Avatar>
          {/* <textarea
            contentEditable="true"
            ref={tweetRef}
            type="text"
            placeholder="what's happening?"
            className="text-area"
            onChange={handleInput}
          ></textarea> */}

          <TextEditor text={text} setText={setText} />
        </div>
        <div className="tools-area">
          {text.length >= 1 && (
            <CircularProgressbar
              className="progress-bar"
              text={
                text.length >= TWEET_MAX_LENGTH - 20 &&
                (TWEET_MAX_LENGTH - text.length).toString()
              }
              value={text.length}
              maxValue={TWEET_MAX_LENGTH}
              styles={progressBarStyles}
            />
          )}
          <Button onClick={submitTweet} className="tweetbox-tweet">
            TWEET
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TweetBox
