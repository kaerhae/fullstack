import React from 'react'

const Notification = ({ notification }) => {
  
  const border = {
    border: "4px solid red",
    textAlign: 'center'
  }
  return (
    <div>
      {
        notification !== null &&
        <p style={border}>{notification}</p>
      }
    </div>
  )
}

export default Notification