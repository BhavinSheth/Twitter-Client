import React from 'react'
import { useState, useEffect } from 'react'
import './sidebar.css'
import SidebarOptions from './sidebaroptions'
import { Twitter } from '@material-ui/icons'
// import { Home } from '@material-ui/icons'
// import { Explore } from '@material-ui/icons'
// import { Notifications } from '@material-ui/icons'
// import { Search } from '@material-ui/icons'
// import { Message } from '@material-ui/icons'
// import { Bookmarks } from '@material-ui/icons'
// import { Profile } from '@material-ui/icons'
// import { More } from '@material-ui/icons'
import { Avatar, Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import sidebarData from './sidebarData'
import { useAppContext } from '../../context/appContext'
import { Link } from 'react-router-dom'
import { CLIENT_BASE_URL } from '../../context/globalConstants'

function Sidebar() {
  const [id, setId] = useState(2)
  const { screenWidth, user } = useAppContext()
  return (
    <div className="sidebar">
      <Twitter className="twitter-icon" />
      {/* {options.map((option) => {
        return <SidebarOptions id={()=>getId()} Icons={option} text={option} />
      })} */}

      {sidebarData.map((data) => {
        return (
          <SidebarOptions
            key={data.id}
            {...data}
            curId={id}
            setId={setId}
            Icons={data.Icons}
          />
        )
      })}

      {screenWidth > 800 ? (
        <Button variant="outlined" className="tweet-btn" fullWidth>
          tweet
        </Button>
      ) : (
        <Button>
          <Add className="add-btn" />
        </Button>
      )}

      {user && (
        <Link to={`${CLIENT_BASE_URL}/${user.userName}`}>
          <Avatar src={user.profileImg} />
        </Link>
      )}
    </div>
  )
}

export default Sidebar
