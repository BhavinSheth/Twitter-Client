import React from 'react'
import './feed.css'
import TweetBox from './tweetbox'
import Post from './post'
import db from '../../firebase'
import { useEffect, useState } from 'react'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'

function Feed() {
  const [posts, setPosts] = useState([])
  console.log('in feed')
  useEffect(async () => {
    const posts = collection(db, 'posts')

    const citySnapshot = await getDocs(posts)
    const postList = citySnapshot.docs.map((doc) => doc.data())
    console.log(postList)
    setPosts(postList)
  }, [])
  return (
    <div className="feed">
      <div className="feed-header">
        <h2>HOME</h2>
      </div>
      <TweetBox />

      {posts.length > 0 &&
        posts.map((post) => {
          return <Post {...post} />
        })}
      {/* <Post displayName="bhavin sheth" userName="bhavinsheth67" /> */}
    </div>
  )
}

export default Feed
