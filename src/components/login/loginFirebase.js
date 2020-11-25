import React, {useState} from "react"
import { navigate } from "gatsby"
import { Form, FormState } from "gatsby-theme-firebase";
import { getUser, handleLoginFirebase, isLoggedIn } from "../../services/auth"

const saveUserToDatabase = user => {
    console.log('user', user)
}

const setMessage = message => {
    console.log('message', message)
}


export default () => {

if (isLoggedIn()) {
    navigate(`/app/profile`)
}
 
return(
  <div className="columns is-vcentered">
    <div className="column is-12">  
        <FormState.Provider>
        <Form
            onLoginSuccess={user => {
                handleLoginFirebase(user)  
                navigate(`/app/profile`)
            }}
            onSignUpSuccess={user => {
                saveUserToDatabase(user).then(() => {
                    navigate("/history");
                });
            }}
            onResetSuccess={() => {
                setMessage("Email sent!");
            }}
        />
        </FormState.Provider>
    </div>
    <div className="column is-6">  
        {getUser().displayNamel?getUser().displayName:null}        
    </div>
  </div>
  )
}