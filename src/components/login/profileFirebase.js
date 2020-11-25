import React from "react"
import { getUser } from "../../services/auth"
const Profile = () => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: {getUser().displayName}</li>
      <li>E-mail: {getUser().email}</li>
      <li>Token: {getUser().token}</li>
    </ul>
  </>
)
export default Profile