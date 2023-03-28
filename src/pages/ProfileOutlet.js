import React from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../components/feed/feed'

function ProfileOutlet() {
  const { param } = useParams()
  console.log(param)
  switch (param) {
    case 'tweets':
      return <Feed />

    case 'replies':
      return <h1>replies</h1>

    case 'likes':
      return <h1>likes</h1>

    case 'followers':
      return <h1>followers</h1>

    case 'following':
      return <h1>following</h1>

    default:
      return <h1>tweet</h1>
  }
}

export default ProfileOutlet
