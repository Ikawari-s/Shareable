import React from 'react'
import { Link } from 'react-router-dom'

function InvalidScreen() {
  return (
    <div>
    <h2>Invalid Reset Password Link</h2>
    <p>The reset password link you provided is invalid or has expired.</p>
    <p>Please try again or contact support for assistance.</p>
    <Link to="/">Go back to Login</Link>
  </div>
  )
}

export default InvalidScreen