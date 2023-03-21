import React from 'react'
import './post.css'
import { Avatar } from '@material-ui/core'

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import RepeatIcon from '@material-ui/icons/Repeat'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import PublishIcon from '@material-ui/icons/Publish'

function Post({ displayName, userName, verified, text, image, avatar }) {
  return (
    <div className="post">
      <div className="post-avatar">
        <Avatar src={avatar}></Avatar>
      </div>
      <div className="post-info">
        <div className="post-name">
          {displayName}
          <span>{verified && <VerifiedUserIcon className="verified" />}</span>
          <span className="username">{userName}</span>
        </div>
        <div className="post-text">{text}</div>
        <div className="image-container">
          <img src={image} alt="" className="img" width={'400px'} />
        </div>
        <div className="utilites">
          <ChatBubbleOutlineIcon className="icon" />
          <RepeatIcon className="icon" />
          <FavoriteBorderIcon className="icon" />
          <PublishIcon className="icon" />
        </div>
      </div>
    </div>
  )
}

export default Post
