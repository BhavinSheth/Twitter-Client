import React, { useState } from 'react'
import './tweetbox.css'
import { Avatar, Button } from '@material-ui/core'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore/lite'
import db from '../../firebase'
import { useEffect } from 'react'

function TweetBox() {
  const [tweet, setTweet] = useState('')

  const submitTweet = async (e) => {
    // console.log('entererd')
    e.preventDefault()
    try {
      const res = await setDoc(doc(db, 'posts', 'randon'), {
        userName: 'kiran sheth',
        displayName: 'kiran78',
        text: tweet,
      })

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="tweetBox">
      <form>
        <div className="input">
          <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"></Avatar>
          <input
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            type="text"
            placeholder="what's happening?"
            className="text-area"
          />
        </div>
        <Button onClick={submitTweet} className="tweetbox-tweet">
          TWEET
        </Button>
      </form>
    </div>
  )
}

export default TweetBox
