import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TextEditor = ({ text, setText }) => {
  const [editorHtml, setEditorHtml] = useState('')
  const quillRef = useRef(null)

  useEffect(() => {
    const editor = quillRef.current.getEditor()
    const handler = (delta, oldContents, source) => {
      if (source === 'user') {
        const text = editor.getText()
        setText(text)
        const hashtags = text.match(/(^|\s)#[^\s]*/g) || []
        const mentions = text.match(/(^|\s)@[^\s]*/g) || []
        editor.formatText(0, text.length, { color: null })
        hashtags.forEach((tag) => {
          const tagIndex = text.indexOf(tag)
          editor.formatText(tagIndex, tag.length, {
            color: 'var(--twitter-color)',
          })
          //   axios.get(`http://example.com/api/hashtags/${tag}`)
        })
        mentions.forEach((mention) => {
          const mentionIndex = text.indexOf(mention)
          editor.formatText(mentionIndex, mention.length, {
            color: 'var(--twitter-color)',
          })
          // Call API for mentions here
          // Example: axios.get(`http://example.com/api/mentions/${mention}`)
        })
      }
    }
    editor.on('text-change', handler)
    return () => {
      editor.off('text-change', handler)
    }
  }, [])

  const handleOnChange = (html) => {
    setEditorHtml(html)
  }

  const modules = {
    toolbar: false,
  }

  return (
    <ReactQuill
      className="text-area"
      value={editorHtml}
      onChange={handleOnChange}
      modules={modules}
      ref={quillRef}
      placeholder="Enter your text here"
    />
  )
}

export default TextEditor
