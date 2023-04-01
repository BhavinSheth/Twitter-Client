import React from 'react'
import { Avatar } from '@material-ui/core'

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ColoredText from '../ColoredText'
import './tweet.css'
import { Link } from 'react-router-dom'
import { CLIENT_BASE_URL } from '../../context/globalConstants'
import Utilities from './Utilities'

function MainTweet({
  _id,
  likes,
  retweets,
  comments,
  createdBy,
  text,
  parent,
  child,
}) {
  const { name, userName, profileImg, isVerified } = createdBy

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
        </div>
      </div>
      <div className={`post-info ${child && 'mg-bottom-0'} main`}>
        {/* <div className="post-text">{text}</div> */}
        <ColoredText className={`post-text`} text={text} />
        {/* <div className="image-container">
          <img src={image} alt="" className="img" width={'400px'} />
        </div> */}
        <Utilities
          comments={comments}
          likes={likes}
          retweets={retweets}
          userName={userName}
          tweetId={_id}
        />
      </div>
    </Link>
  )
}

export default MainTweet
