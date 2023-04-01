import React from 'react'

function ColoredText({ text, setText, className }) {
  const words = text.split(' ')
  return (
    <div>
      {words.map((word, index) => {
        if (word.startsWith('#') || word.startsWith('@')) {
          return (
            <span
              className={className}
              key={index}
              style={{ color: 'var(--twitter-color)' }}
            >
              {word}{' '}
            </span>
          )
        } else {
          return (
            <span className={className} key={index}>
              {word}{' '}
            </span>
          )
        }
      })}
    </div>
  )
}

export default ColoredText
