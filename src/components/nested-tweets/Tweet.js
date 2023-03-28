import React from 'react'
import { Avatar } from '@material-ui/core'

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import Comment from '@material-ui/icons/ChatBubbleOutline'
import Retweet from '@material-ui/icons/Repeat'
import Like from '@material-ui/icons/FavoriteBorder'
import ColoredText from '../ColoredText'
import './tweet.css'

function Tweet({
  main,
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
    <div className={`post ${child && 'border-bottom-0'}`}>
      <div className="post-nested">
        {parent && <div className="vertical-line parent" />}
        <Avatar
          className={`post-avatar ${parent && 'nested'}`}
          nested
          src={profileImg}
        ></Avatar>
        {child && <div className="vertical-line" />}
      </div>
      <div className={`post-info ${child && 'mg-bottom-0'}`}>
        <div className="post-name">
          {name}
          <span>{isVerified && <VerifiedUserIcon className="verified" />}</span>
          <span className="username">@{userName}</span>
        </div>
        {/* <div className="post-text">{text}</div> */}
        <ColoredText className="post-text" text={text} />
        {/* <div className="image-container">
          <img src={image} alt="" className="img" width={'400px'} />
        </div> */}
        <div className="utilites">
          <div className="icon-container">
            <Comment className="icon" />
            <div className="icon-values">{comments.length} </div>
          </div>

          <div className="icon-container">
            <Retweet className="icon" />
            <div className="icon-values">{retweets.length} </div>
          </div>

          <div className="icon-container">
            <Like className="icon" />
            <div className="icon-values">{likes.length} </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
