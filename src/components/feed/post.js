import React from 'react'
import './post.css'
import { Avatar } from '@material-ui/core'

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import Comment from '@material-ui/icons/ChatBubbleOutline'
import Retweet from '@material-ui/icons/Repeat'
import Like from '@material-ui/icons/FavoriteBorder'
import ColoredText from '../ColoredText'

function Post({ text, createdBy, likes, comments, retweets, createdAt }) {
  const { name, userName, profileImg, isVerified } = createdBy
  console.log(createdAt)
  return (
    <div className="post">
      <div className="post-avatar">
        <Avatar src={profileImg}></Avatar>
      </div>

      <div className="post-info">
        <div className="post-name">
          {name}
          <span>{isVerified && <VerifiedUserIcon className="verified" />}</span>
          <span className="username">@{userName}</span>
          <span className="date">{}</span>
        </div>
        {/* <div className="post-text">{text}</div> */}
        <ColoredText className="post-text" text={text} />
        {/* <div className="image-container">
          <img src={image} alt="" className="img" width={'400px'} />
        </div> */}
        <div className="utilites">
          <div className="icon-container">
            <Comment className="icon" />
            <div className="icon-values">{comments} </div>
          </div>

          <div className="icon-container">
            <Retweet className="icon" />
            <div className="icon-values">{retweets} </div>
          </div>

          <div className="icon-container">
            <Like className="icon" />
            <div className="icon-values">{likes} </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
