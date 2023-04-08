import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../../../context/appContext'
import Tweet from '../../../components/nested-tweets/Tweet'

function ProfileTweets() {
  const { getProfileTweets, profileTweets } = useAppContext()

  useEffect(() => {
    getProfileTweets()
  }, [])

  return (
    <div>
      {profileTweets.length > 0 ? (
        profileTweets.map((tweet, index) => {
          return (
            <Tweet key={index} {...tweet} getProfileTweets={getProfileTweets} />
          )
        })
      ) : (
        <h1>no tweet found</h1>
      )}
    </div>
  )
}

export default ProfileTweets
