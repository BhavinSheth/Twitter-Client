import React from 'react'
import { useParams } from 'react-router-dom'
import PersonList from '../../components/people-list/PersonList'
import { useAppContext } from '../../context/appContext'
import TweetList from '../../components/TweetList'
import { useEffect } from 'react'

function SearchTabs() {
  const { allResults, filteredResults } = useAppContext()
  const { type } = useParams()

  switch (type) {
    case 'tweets':
      return (
        filteredResults.tweets && <TweetList tweets={filteredResults.tweets} />
      )

    case 'latest':
      return (
        filteredResults.tweets && <TweetList tweets={filteredResults.tweets} />
      )

    case 'people':
      return (
        filteredResults.users && (
          <PersonList peopleList={filteredResults.users} />
        )
      )

    default:
      return (
        filteredResults.tweets && <TweetList tweets={filteredResults.tweets} />
      )
  }
}
export default SearchTabs
