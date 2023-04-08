import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../../../context/appContext'
import PersonList from '../../../components/people-list/PersonList'

function ProfileFollowing() {
  const { getProfileFollowing, profileFollowing } = useAppContext()

  useEffect(() => {
    getProfileFollowing()
  }, [])

  return (
    <followers>
      {profileFollowing.length > 0 ? (
        <PersonList peopleList={profileFollowing} />
      ) : (
        <h1>No Following Found</h1>
      )}
    </followers>
  )
}

export default ProfileFollowing
