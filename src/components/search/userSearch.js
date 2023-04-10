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
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'

function UserSearch({
  profileImg,
  name,
  userName,
  isVerified,
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
      getUserProfile && getUserProfile()
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)
    }

    dispatch({ type: STOP_SPINNER })
  }

  return (
    <Link to={`${CLIENT_BASE_URL}/${userName}`}>
      <div className="single-person search">
        <div className="avatar-container search">
          <Avatar className="person-avatar search" src={profileImg} />
        </div>
        <div className="person-info-container search">
          <div className="person-names search">
            <div className="names search">
              <div className="name search">
                <span>{name}</span>
                {isVerified && <VerifiedUserIcon className="verified small" />}
              </div>
              <div className="person-username search">
                <div className="username search">{userName}</div>
                {isFollowingYou && (
                  <p className="follows-you search">follows you</p>
                )}
              </div>
            </div>
            <div
              onClick={follow_or_unfollow_user}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`btn follow-btn search ${doYouFollow && 'following'}`}
            >
              {doYouFollow ? (isHovered ? 'unfollow' : 'following') : 'follow'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UserSearch
