import { Avatar } from '@material-ui/core'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import './profile.css'
import { HiCake } from 'react-icons/hi'
import { RxCalendar } from 'react-icons/rx'
import { MdOutlineLocationOn } from 'react-icons/md'
import { Categories } from './categories'
import profileCategories from './profileCategories'

function Profile() {
  const { userName } = useParams()
  console.log('in profile username : ', userName)

  return (
    <div className="profile-container">
      <div className="profile-dashboard">
        <div className="main-containers">
          <div className="dashboard-img-containers">
            <div className="bg-img-container">
              <img
                className="dashboard-bg-img"
                src="https://thumbs.dreamstime.com/b/sun-rays-mountain-landscape-5721010.jpg"
                alt=""
                srcset=""
              />
            </div>
          </div>
          <Avatar
            className="dashboard-profile-img"
            src="https://pbs.twimg.com/profile_images/1629822390653054976/jX5bIqK4.jpg"
          />
        </div>
        <div className="edit-profile">
          <button className="btn edit-btn">edit profile</button>
        </div>
        <div className="dashboard-info">
          <div className="dashboard-name-username">
            <div className="dashboard-name">Bhavin sheth</div>
            <div className="dashboard-username">@bhavinsheth67</div>
          </div>
          <div className="dashboard-bio-data">
            Tweets about Competitive Programming, Content Creation,
            Entrepreneurship, College and Engineering | Linkedin 90k, Youtube
            45k | Building @TLE_Eliminators
          </div>
          <div className="dashboard-bio">
            <div className="bio-containers">
              <MdOutlineLocationOn /> <span>Gujarat, India</span>
            </div>
            <div className="bio-containers">
              <HiCake /> <span>Born May 11, 2001</span>
            </div>
            <div className="bio-containers">
              <RxCalendar /> <span>Joined June 2020</span>
            </div>
          </div>
          <div className="follower-following">
            <div className="follower">
              <span className="follower-count">100</span> followers
            </div>
            <div className="follower">
              <span className="follower-count">3000</span> following
            </div>
          </div>
        </div>
      </div>

      <Categories categories={profileCategories} />
      <Outlet />
    </div>
  )
}

export default Profile
