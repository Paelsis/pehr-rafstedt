import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"
import { getUser, isLoggedIn } from "../services/auth"
export default () => {
  return (
    <Layout>
    <SEO title="Profile" />
      <h1>Hello {isLoggedIn() ? getUser().name : "world"}!</h1>
      <p>
        {isLoggedIn() ? (
          <>
            You are logged in, so check your{" "}
            <Link to="/app/profile">profile</Link>
          </>
        ) : (
          <>
            You should <Link to="/app/login">log in</Link> to see all your restricted
            content
          </>
        )}
        
      </p>
    </Layout>
  )
}

