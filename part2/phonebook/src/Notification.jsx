import React from "react"
import "./Notification.css" // Import the CSS file for styling

const Notification = ({ message }) => {
  return <div className="error">{message}</div>
}

export default Notification
