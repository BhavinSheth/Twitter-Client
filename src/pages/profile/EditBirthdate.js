import * as React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useState } from 'react'
import dayjs from 'dayjs'

function EditBirthdate({ birthdate, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Birthdate"
          defaultValue={birthdate}
          format="DD/MM/YYYY"
          value={birthdate}
          onChange={onChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default EditBirthdate
