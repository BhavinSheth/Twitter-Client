import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../../../context/appContext'
import PersonList from '../../../components/people-list/PersonList'

function ProfileFollowers() {
  const { getProfileFollowers, profileFollowers } = useAppContext()

  useEffect(() => {
    getProfileFollowers()
  }, [])

  return (
    <followers>
      {profileFollowers.length > 0 ? (
        <PersonList peopleList={profileFollowers} />
      ) : (
        <h1>No Follower Found</h1>
      )}
    </followers>
  )
}

export default ProfileFollowers
