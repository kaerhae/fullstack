import React from 'react'
import { connect } from 'react-redux'

const Notification = ( props ) => {

  if (!props.notification) {
    return null
  }

  return (
    <div className="message">
      {props.notification}
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