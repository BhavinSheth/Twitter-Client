import React, { useState } from 'react'
import './tweetbox.css'
import { Avatar, Button } from '@material-ui/core'
import { useAppContext } from '../../context/appContext'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
  CLIENT_BASE_URL,
  SERVER_BASE_URL,
  START_SPINNER,
  STOP_SPINNER,
  TWEET_MAX_LENGTH,
} from '../../context/globalConstants'
import TextEditor from '../TextEditor'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { MdOutlineAddPhotoAlternate as AddImage } from 'react-icons/md'

const defaultImg = `https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png`

function TweetBox({ comment, username, tweetId }) {
  const [text, setText] = useState('')
  const [image, setImage] = useState()
  const [base64EncodedImage, setBase64EncodedImage] = useState()
  const { user, configs, dispatch, get_all_search_results } = useAppContext()

  const handleImage = (e) => {
    setImage(e.target.files[0])
    console.log(e.target.files)
    convertToBase64Encoded(e.target.files[0])
    toast.success('image uploaded')
  }
  const convertToBase64Encoded = (image) => {
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onloadend = () => {
      setBase64EncodedImage(reader.result)
    }
  }

  const createTweet = async () => {
    const res = await axios.post(
      `${SERVER_BASE_URL}/${user.userName}/tweets`,
      { text, images: [base64EncodedImage] },
      configs
    )
    get_all_search_results()
    toast.success('Tweet created succesfully')
    // return res
  }

  const commentTweet = async () => {
    const res = await axios.post(
      `${SERVER_BASE_URL}/${username}/status/${tweetId}/comment`,
      { text },
      configs
    )
    toast.success(`you commented on ${username}'s tweet`)
    get_all_search_results()
    return res
  }

  const submitTweet = async (e) => {
    dispatch({ type: START_SPINNER })
    e.preventDefault()
    try {
      // Tweet
      const res = comment ? await commentTweet() : await createTweet()
      // Comment
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
    <div className="tweetBox" id="tweet">
      {comment && (
        <div className="tweetbox-header">
          Replying to
          <Link to={`${CLIENT_BASE_URL}/${username}`} className="username">
            @{username}
          </Link>
        </div>
      )}
      <form>
        <div className="tweetBox-input">
          <Avatar src={`${user && user.profileImg}`}></Avatar>

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
          <div className="tools-utilities">
            <input
              type="file"
              multiple
              id="imageInput"
              style={{ display: 'none' }}
              onChange={handleImage}
            />
            <label htmlFor="imageInput">
              <AddImage type="file" className="icon" />
            </label>

            <Button
              disabled={text.length > TWEET_MAX_LENGTH}
              onClick={submitTweet}
              className="tweetbox-tweet"
            >
              {comment ? 'reply' : 'tweet'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TweetBox
