import { Avatar } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  CLIENT_BASE_URL,
  SERVER_BASE_URL,
  START_SPINNER,
  STOP_SPINNER,
} from '../../context/globalConstants'
import { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function SinglePerson({
  profileImg,
  name,
  userName,
  bio,
  isFollowingYou,
  doYouFollow,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const {
    dispatch,
    configs,
    getUserProfile,
    getProfileFollowers,
    getProfileFollowing,
  } = useAppContext()

  const follow_or_unfollow_user = async (e) => {
    e.preventDefault()
    dispatch({ type: START_SPINNER })

    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/${userName}/${doYouFollow ? 'unfollow' : 'follow'}`,
        null,
        configs
      )
      console.log(res.data)
      toast.success(
        `you ${doYouFollow ? 'you unfollowed ' : 'you followed '} ${name}`
      )
      getProfileFollowers && getProfileFollowers()
      getProfileFollowing && getProfileFollowing()
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)
    }

    dispatch({ type: STOP_SPINNER })
  }

  return (
    <Link to={`${CLIENT_BASE_URL}/${userName}`}>
      <div className="single-person">
        <div className="avatar-container">
          <Avatar className="person-avatar" src={profileImg} />
        </div>
        <div className="person-info-container">
          <div className="person-names">
            <div className="names">
              <div className="name">{name}</div>
              <div className="person-username">
                <div className="username">{userName}</div>
                {isFollowingYou && <p className="follows-you">follows you</p>}
              </div>
            </div>
            <div
              onClick={follow_or_unfollow_user}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`btn follow-btn ${doYouFollow && 'following'}`}
            >
              {doYouFollow ? (isHovered ? 'unfollow' : 'following') : 'follow'}
            </div>
          </div>
          <div className="bio">{bio}</div>
        </div>
      </div>
    </Link>
  )
}

export default SinglePerson
