import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import './profile.css'
import { HiCake } from 'react-icons/hi'
import { RxCalendar } from 'react-icons/rx'
import { MdOutlineLocationOn } from 'react-icons/md'
import { Categories } from './categories'
import profileCategories from './profileCategories'
import { useAppContext } from '../../context/appContext'
import {
  START_SPINNER,
  STOP_SPINNER,
  SERVER_BASE_URL,
} from '../../context/globalConstants'
import axios from 'axios'
import { toast } from 'react-toastify'
import Header from '../../components/common-headers/Header'
import EditModal from './EditModal'
import { Chip } from '@mui/material'
import { FcGoogle } from 'react-icons/fc'

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

function Profile() {
  let subtitle
  const [modalIsOpen, setIsOpen] = useState(false)
  const { userName } = useParams()
  const { profile, getUserProfile, dispatch, configs } = useAppContext()

  const followUser = async (username) => {
    dispatch({ type: START_SPINNER })

    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/${profile.userName}/follow`,
        null,
        configs
      )
      console.log(res.data)
      toast.success(`you followed ${profile.name}`)
      getUserProfile(userName)
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)
    }

    dispatch({ type: STOP_SPINNER })
  }

  const unFollowUser = async () => {
    dispatch({ type: START_SPINNER })

    try {
      const res = await axios.post(
        `${SERVER_BASE_URL}/${profile.userName}/unfollow`,
        null,
        configs
      )
      console.log(res.data)
      toast.success(`you unfollowed ${profile.name}`)
      getUserProfile(userName)
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)
    }

    dispatch({ type: STOP_SPINNER })
  }

  useEffect(() => {
    getUserProfile(userName)
  }, [userName])

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'black',
      display: 'grid',
      borderRadius: '15px',
    },
  }

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false)
  }

  const getBirthdate = (birthdate) => {
    const date = new Date(birthdate)
    const displayDate = `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`

    return displayDate
  }

  const getJoinedDate = (joinedDate) => {
    const date = new Date(joinedDate)
    const displayDate = `${months[date.getMonth()]}, ${date.getFullYear()}`

    return displayDate
  }

  return (
    <>
      {profile && (
        <div className="profile-container">
          <Header headerName={'Profile'} margin />
          <div className="profile-dashboard">
            <div className="main-containers">
              <div className="dashboard-img-containers">
                <div className="bg-img-container">
                  <img
                    className="dashboard-bg-img"
                    src={
                      profile.bannerImg ||
                      `https://thumbs.dreamstime.com/b/sun-rays-mountain-landscape-5721010.jpg`
                    }
                    alt=""
                    srcset=""
                  />
                </div>
              </div>
              <Avatar
                className="dashboard-profile-img"
                src={
                  profile.profileImg ||
                  `https://pbs.twimg.com/profile_images/1629822390653054976/jX5bIqK4.jpg`
                }
              />
            </div>
            <div className="edit-profile">
              {profile.status === 'edit' ? (
                <button className="btn edit-btn" onClick={openModal}>
                  edit profile
                </button>
              ) : profile.status === 'unfollow' ? (
                <button className="btn edit-btn" onClick={unFollowUser}>
                  unfollow
                </button>
              ) : (
                <button className="btn edit-btn" onClick={followUser}>
                  follow
                </button>
              )}

              {/* {profile.isLoggedInByGoogle && (
                <Chip
                  label="Google SignIn"
                  className="custom-chip"
                  icon={<FcGoogle />}
                />
              )} */}
            </div>
            <EditModal
              openModal={openModal}
              closeModal={closeModal}
              modalIsOpen={modalIsOpen}
              subtitle={subtitle}
              afterOpenModal={afterOpenModal}
              profile={profile}
              getUserProfile={getUserProfile}
            />
            <div className="dashboard-info">
              <div className="dashboard-name-username">
                <div className="dashboard-name">{profile.name}</div>
                <div className="dashboard-username">{profile.userName}</div>
              </div>
              <div className="dashboard-bio-data">{profile.bio}</div>
              <div className="dashboard-bio">
                <div className="bio-containers">
                  <MdOutlineLocationOn /> <span>Gujarat, India</span>
                </div>
                <div className="bio-containers">
                  <HiCake /> <span>Born {getBirthdate(profile.birthdate)}</span>
                </div>
                <div className="bio-containers">
                  <RxCalendar />{' '}
                  <span>Joined {getJoinedDate(profile.createdAt)}</span>
                </div>
              </div>
              <div className="follower-following">
                <div className="follower">
                  <span className="follower-count">
                    {profile.followers.length}
                  </span>{' '}
                  followers
                </div>
                <div className="follower">
                  <span className="follower-count">
                    {profile.following.length}
                  </span>{' '}
                  following
                </div>
              </div>
            </div>
          </div>

          <Categories categories={profileCategories} />
          <Outlet />
        </div>
      )}
    </>
  )
}

export default Profile
