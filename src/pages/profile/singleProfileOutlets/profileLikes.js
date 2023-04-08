import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../../../context/appContext'
import Tweet from '../../../components/nested-tweets/Tweet'
import { useParams } from 'react-router-dom'

function ProfileLikes() {
  const { getProfileLikes, profileLikes } = useAppContext()
  const params = useParams()

  useEffect(() => {
    getProfileLikes()
  }, [])

  return (
    <div>
      {profileLikes.length > 0 ? (
        profileLikes.map((tweet, index) => {
          return (
            <Tweet key={index} {...tweet} getProfileLikes={getProfileLikes} />
          )
        })
      ) : (
        <h1>no tweet found</h1>
      )}
    </div>
  )
}

export default ProfileLikes
