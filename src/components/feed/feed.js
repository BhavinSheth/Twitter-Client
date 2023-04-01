import React from 'react'
import './feed.css'
import './post.css'
import { useEffect } from 'react'
import Tweet from '../nested-tweets/Tweet'
import { useAppContext } from '../../context/appContext'
import Loading from '../spinner/LoadingPage'

function Feed() {
  const { getHomePageTweets, homePageTweets } = useAppContext()

  useEffect(() => {
    getHomePageTweets()
  }, [])

  return (
    <div className="feed">
      <Loading
        children={homePageTweets.map((post) => {
          return <Tweet {...post} />
        })}
      />
    </div>
  )
}

export default Feed
