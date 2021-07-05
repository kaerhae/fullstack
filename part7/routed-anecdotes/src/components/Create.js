import React, { useState } from 'react'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const resetting = useField('')

  let history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/anecdotes')    
  }

  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content}/>
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info}/>
        </div>
          <button onClick={handleSubmit}>create</button>
          <button >Reset</button>
      </form>
      

    </div>
  )

}

  export default CreateNew