import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../../../context/appContext'
import TweetContainer from '../../../components/nested-tweets/TweetContainer'
import { useParams } from 'react-router-dom'

function ProfileComments() {
  const { getProfileComments, profileComments, profile } = useAppContext()
  const params = useParams()

  useEffect(() => {
    getProfileComments()
  }, [])

  return (
    <div>
      {profileComments.length > 0 ? (
        profileComments.map((tweetId, index) => {
          return (
            <TweetContainer
              key={index}
              tweetId={tweetId}
              userName={profile.userName}
            />
          )
        })
      ) : (
        <h1>no tweet found</h1>
      )}
    </div>
  )
}

export default ProfileComments
