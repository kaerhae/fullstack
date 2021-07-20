import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message }) => {

  if (!message) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications