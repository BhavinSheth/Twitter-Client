import React from 'react'

function EditInput({ text, label, onChange, name, disabled }) {
  return (
    <div class="edit-input-group">
      <input
        required=""
        type="text"
        name={name}
        autocomplete="off"
        class={`edit-input ${disabled && 'red'}`}
        value={text}
        onChange={onChange}
        disabled={disabled}
      />
      <label class={`user-label ${text && 'changed-label'}`}>{label}</label>
    </div>
  )
}

export default EditInput
