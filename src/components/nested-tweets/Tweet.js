import React from 'react'
import { Avatar } from '@material-ui/core'

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import Retweet from '@material-ui/icons/Repeat'

import ColoredText from '../ColoredText'
import './tweet.css'
import { Link } from 'react-router-dom'
import { CLIENT_BASE_URL } from '../../context/globalConstants'
import Utilities from './Utilities'
import { useAppContext } from '../../context/appContext'
import { BsDot } from 'react-icons/bs'

function Tweet({
  _id,
  likes,
  retweets,
  comments,
  createdBy,
  text,
  createdAt,
  parent,
  child,
  images,
  formattedCreatedAt,
  isRetweeted,
  getSingleTweet,
  getProfileTweets,
  getProfileLikes,
}) {
  const { name, userName, profileImg, isVerified } = createdBy
  const { profile } = useAppContext()
  const months = [
    'Jan',
    'Feb',
    'March',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const getTime = () => {
    let displayTime
    const currentTime = new Date()

    const createdTime = new Date(createdAt)
    const year = createdTime.getFullYear()
    const month = createdTime.getMonth()
    const day = createdTime.getDate()

    const diffInMs = currentTime - createdTime
    const diffInSecs = parseInt(diffInMs / 1000)
    const diffInMins = parseInt(diffInSecs / 60)
    const diffInHours = parseInt(diffInMins / 60)

    if (diffInSecs < 60) displayTime = `${diffInSecs}s`
    else if (diffInMins < 60) displayTime = `${diffInMins}m`
    else if (diffInHours < 24) displayTime = `${diffInHours}h`
    else if (currentTime.getFullYear() - year < 1)
      displayTime = `${day} ${months[month]}`
    else displayTime = `${day} ${months[month]}, ${year}`

    return displayTime
  }

  return (
    <div className="post-container">
      {isRetweeted && (
        <div className="is-retweeted">
          <p>{profile.userName} retweeted</p>
          <Retweet />
        </div>
      )}
      <Link
        to={`${CLIENT_BASE_URL}/${userName}/status/${_id}`}
        className={`post ${child && 'border-bottom-0'}`}
      >
        <div className="post-nested">
          {parent && <div className="vertical-line parent" />}
          <Link to={`${CLIENT_BASE_URL}/${userName}`}>
            <Avatar
              className={`post-avatar ${parent && 'nested'} `}
              nested
              src={profileImg}
            />
          </Link>
          {child && <div className="vertical-line" />}
        </div>
        <div className={`post-info ${child && 'mg-bottom-0'}`}>
          <div className={`post-name`}>
            {name}
            <span>
              {isVerified && <VerifiedUserIcon className="verified" />}
            </span>
            <span className="username">@{userName}</span>
            {createdAt && (
              <div className="time-container">
                <BsDot className="dot" />
                <div className="time">{getTime()}</div>
              </div>
            )}
          </div>
          {/* <div className="post-text">{text}</div> */}
          <ColoredText className={`post-text`} text={text} />
          {images.length > 0 && (
            <div className="image-container">
              <img src={images[0]} alt="" className="img" width={'400px'} />
            </div>
          )}
          <Utilities
            comments={comments}
            likes={likes}
            retweets={retweets}
            userName={userName}
            tweetId={_id}
            getSingleTweet={getSingleTweet}
            getProfileTweets={getProfileTweets}
            getProfileLikes={getProfileLikes}
          />
        </div>
      </Link>
    </div>
  )
}

export default Tweet
