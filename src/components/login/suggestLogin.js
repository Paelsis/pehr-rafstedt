import React from "react"
import { Link } from "gatsby"
import { getUser, isLoggedIn } from "../services/auth"
export default () => {
  return (
    <div>
      <h1>Hello {isLoggedIn() ? getUser().name : "world"}!</h1>
      <p>
        {isLoggedIn() ? (
          <>
            You are logged in, so check your{" "}
            <Link to="/app/profile">profile</Link>
          </>
        ) : (
          <>
            You should <Link to="/app/login">log in</Link> to see restricted content
          </>
        )}
      </p>
    </div>
  )
}