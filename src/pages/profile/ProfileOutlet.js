import React from 'react'
import { useParams } from 'react-router-dom'
import ProfileTweets from './singleProfileOutlets/profileTweets'
import ProfileLikes from './singleProfileOutlets/profileLikes'
import ProfileComments from './singleProfileOutlets/profileComments'
import ProfileFollowers from './singleProfileOutlets/profileFollowers'
import ProfileFollowing from './singleProfileOutlets/profileFollowing'

function ProfileOutlet() {
  const { param } = useParams()
  switch (param) {
    case 'tweets':
      return <ProfileTweets />

    case 'replies':
      return <ProfileComments />

    case 'likes':
      return <ProfileLikes />

    case 'followers':
      return <ProfileFollowers />

    case 'following':
      return <ProfileFollowing />

    default:
      return <ProfileTweets />
  }
}

export default ProfileOutlet
