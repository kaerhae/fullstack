import React from 'react'

const Notification = ({ message, errorMessage }) => {

    if (message === null) {
      return null
    }

  const checkError =  message === errorMessage
    
  if(checkError)
  {
      return (
        <div className="error">
          {message} 
        </div>
      )
    }

   


  return (
      <div className="success">
          {message}
      </div>
  )

  }
  
export default Notification