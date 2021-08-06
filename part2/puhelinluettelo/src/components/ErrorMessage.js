import React from 'react'

const ErrorMessage = ({ errorMessage }) => {

  if (!errorMessage) {
    return null
  } else {
    return (
      <div className="error">
        {errorMessage} 
      </div>
    )
  }
  
}
  
export default ErrorMessage