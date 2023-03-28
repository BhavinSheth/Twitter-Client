import React from 'react'

function ColoredTextArea({ text, setText, className }) {
  const words = text.split(' ')
  console.log(words)
  return (
    <div
      contentEditable={true}
      className={className}
      //   value={text}
      onChange={(e) => {
        console.log(text)
        setText(e.target.value)
      }}
    >
      {words.map((word, index) => {
        console.log(word)
        if (word.startsWith('#') || word.startsWith('@')) {
          return (
            <span key={index} style={{ color: 'var(--twitter-color)' }}>
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

export default ColoredTextArea
