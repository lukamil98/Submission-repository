import React from "react"
import "./styles.css"

const Notification = ({ message, type }) => {
  const className = type === "error" ? "error" : "success"

  return <div className={`notification ${className}`}>{message}</div>
}

export default Notification
