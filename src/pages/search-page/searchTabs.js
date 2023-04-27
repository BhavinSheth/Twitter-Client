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
      return filteredResults.tweets.length > 0 ? (
        <TweetList tweets={filteredResults.tweets} />
      ) : (
        <div className="not-found">no tweets found</div>
      )

    case 'latest':
      return filteredResults.tweets.length > 0 ? (
        <TweetList tweets={filteredResults.tweets} />
      ) : (
        <div className="not-found">no tweets found</div>
      )

    case 'people':
      return filteredResults.users.length > 0 ? (
        <PersonList peopleList={filteredResults.users} />
      ) : (
        <div className="not-found">no users found</div>
      )

    default:
      return filteredResults.tweets ? (
        <TweetList tweets={filteredResults.tweets} />
      ) : (
        <div className="not-found">no tweets found</div>
      )
  }
}
export default SearchTabs
