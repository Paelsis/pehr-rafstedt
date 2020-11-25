import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/login/privateRoute"
import Profile from "../components/login/profile"
import LoginFirebase from "../components/login/loginFirebase"
export default () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <LoginFirebase path="/app/login" />
    </Router>
  </Layout>
)
