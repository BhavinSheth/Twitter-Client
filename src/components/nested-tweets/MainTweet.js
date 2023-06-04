import React from 'react'
import { Avatar } from '@material-ui/core'

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ColoredText from '../ColoredText'
import './tweet.css'
import { Link } from 'react-router-dom'
import { CLIENT_BASE_URL } from '../../context/globalConstants'
import Utilities from './Utilities'
import { BsDot } from 'react-icons/bs'

function MainTweet({
  _id,
  likes,
  retweets,
  comments,
  images,
  createdBy,
  createdAt,
  formattedCreatedAt,
  text,
  parent,
  child,
  getSingleTweet,
}) {
  const { name, userName, profileImg, isVerified } = createdBy
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

    const diffInMs = currentTime - new Date(createdAt)
    const diffInSecs = parseInt(diffInMs / 1000)
    const diffInMins = parseInt(diffInSecs / 60)
    const diffInHours = parseInt(diffInMins / 60)

    if (diffInSecs < 60) displayTime = `${diffInSecs}s`
    else if (diffInMins < 60) displayTime = `${diffInMins}m`
    else if (diffInHours < 24) displayTime = `${diffInHours}h`
    else if (currentTime.getFullYear() - formattedCreatedAt.year < 1)
      displayTime = `${formattedCreatedAt.day} ${
        months[formattedCreatedAt.month]
      }`
    else
      displayTime = `${formattedCreatedAt.day} ${
        months[formattedCreatedAt.month]
      }, ${formattedCreatedAt.year}`

    return displayTime
  }
  return (
    <Link
      to={`${CLIENT_BASE_URL}/${userName}/status/${_id}`}
      className={`post ${child && 'border-bottom-0'} main`}
    >
      <div className="post-headers">
        <div className="post-nested">
          {parent && <div className="vertical-line parent" />}
          <Link to={`${CLIENT_BASE_URL}/${userName}`}>
            <Avatar
              className={`post-avatar ${parent && 'nested'} main`}
              nested
              src={profileImg}
            />
          </Link>
          {child && <div className="vertical-line" />}
        </div>
        <div className={`post-name main`}>
          {name}
          <span>{isVerified && <VerifiedUserIcon className="verified" />}</span>
          <span className="username">@{userName}</span>
          {formattedCreatedAt && (
            <div className="time-container">
              <BsDot className="dot" />
              <div className="time">{getTime()}</div>
            </div>
          )}
        </div>
      </div>
      <div className={`post-info ${child && 'mg-bottom-0'} main`}>
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
        />
      </div>
    </Link>
  )
}

export default MainTweet
