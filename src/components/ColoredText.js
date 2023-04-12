import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { CLIENT_BASE_URL } from '../context/globalConstants'

function ColoredText({ text, setText, className }) {
  const { setGlobalSearch, get_filtered_search_results } = useAppContext()

  const handleClick = (hashtag) => {
    // const hashtag = e.target.value
    console.log(hashtag, 'hashtag after clicking')
    setGlobalSearch(hashtag)
    get_filtered_search_results(hashtag)
  }

  const words = text.split(' ')
  return (
    <div className={className}>
      {words.map((word, index) => {
        if (word.startsWith('#')) {
          return (
            <Link
              to={`${CLIENT_BASE_URL}/search/searchType/tweets`}
              onClick={(e) => {
                // e.preventDefault()
                handleClick(word)
              }}
              key={index}
              className="post-text-highlight"
            >
              {word}{' '}
            </Link>
          )
        } else if (word.startsWith('@')) {
          return (
            <Link
              to={`${CLIENT_BASE_URL}/${word.substring(1)}`}
              key={index}
              className="post-text-highlight"
            >
              {word}{' '}
            </Link>
          )
        } else {
          return <span key={index}>{word} </span>
        }
      })}
    </div>
  )
}

export default ColoredText
