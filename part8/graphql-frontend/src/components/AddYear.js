import React, { useState } from 'react'
import { Button, TextField, Typography } from '@material-ui/core'
import Select from 'react-select'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'
import Alert from '@material-ui/lab/Alert';

const AddYear = ({ authors }) => {
  
  const [ authorNull, setAuthorNull ] = useState('')
  const [ year, setYear ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [  {query: ALL_AUTHORS } ]
  })

  const filterNull = authors.filter(a => a.born === null)

  const handleChange = (authorNull) => {
    setAuthorNull(authorNull)
  }

  const yearOnChange = (e) => {
    setYear(parseInt(e.target.value))
  }

  const submit = (event) => {
    event.preventDefault()
    if(authorNull) {
      const name = authorNull.name
      const setBornTo = year
      console.log(name, setBornTo)
      updateAuthor({  variables: { name, setBornTo } })
      setAuthorNull('')
      setYear('')
    } else {
      setMessage('You need to provide name of the author!')
    }
  }

  return (
    <div style={{ marginTop:'50px' }}>
      {
        message ? <Alert severity="error">{message}</Alert> : null
      }
      <Typography variant="h5">Set Birth Year</Typography>
      <form onSubmit={submit}>
        <Select
          className="form-inputfield"
          value={authorNull}
          options={filterNull}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          onChange={handleChange}
        />
         <TextField
            className="form-inputfield"
            label="Year of Birth"
            type="text"
            required
            value={year}
            name="year"
            onChange={yearOnChange}
          />
        <div>
          <Button style={{ margin: '15px', background:"black", color:'white' }} type="submit">Update Author</Button>
        </div>
      </form>
    </div>
  )
}

export default AddYear