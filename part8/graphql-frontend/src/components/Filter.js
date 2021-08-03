import { Container, Button } from '@material-ui/core'
import React from 'react'
import Select from 'react-select'

const Filter = ({
  options,
  submitSelect,
  handleOnChange
}) => {

  return (
    <Container>
      <form onSubmit={submitSelect}>
        <Select
          className="form-select"
          options={options}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          onChange={handleOnChange}
        />
        <Button type="submit" style={{ background:'#D9D9D9'}}>Filter By Genre</Button>
      </form>
    </Container>
  )
}

export default Filter