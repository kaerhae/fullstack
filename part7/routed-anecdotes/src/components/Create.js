import React from 'react'
import { useField} from '../hooks/index.js'
import { useHistory } from 'react-router-dom'

const CreateNew = (props) => {
  const { content, clearContent } = useField('text')
  const { author, clearAuthor } = useField('text')
  const { info, clearInfo } = useField('text')
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

  const clearSubmit = (e) => {
    e.preventDefault()
    clearContent.resetForm()
    clearAuthor.resetForm()
    clearInfo.resetForm()
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
          <button onClick={clearSubmit}>Reset</button>
      </form>
      

    </div>
  )

}

  export default CreateNew