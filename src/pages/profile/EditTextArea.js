import TextareaAutosize from '@mui/base/TextareaAutosize'
import React from 'react'

function EditTextArea({ text, label, onChange, name, disabled }) {
  return (
    <div class="edit-input-group">
      <TextareaAutosize
        required=""
        type="text"
        name={name}
        autocomplete="off"
        class={`edit-input ${disabled && 'red'}`}
        value={text}
        onChange={onChange}
        disabled={disabled}
        minRows={'3'}
      />
      <label class={`user-label ${text && 'changed-label'}`}>{label}</label>
    </div>
  )
}

export default EditTextArea
