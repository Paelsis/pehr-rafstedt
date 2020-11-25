import React, {useState} from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../../services/auth"

export default () => {
  const [user, setUser] = useState({})  
  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value})
  }
  const handleChecked = e => {
    setUser({...user, [e.target.name]: e.target.checked})
  }
  const handleSubmit = e => {
    e.preventDefault()
    handleLogin(user)
  }
  if (isLoggedIn()) {
      navigate(`/app/profile`)
  }
  return (
        <section class="hero is-halfheight">
        <div class="hero-body">
            <div class="container is-primary">
            <div className="columns is-centered">
                <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                <form 
                    className="box"
                    style={{backgroundColor:'lightGreen', opacity:0.9}}                        
                    method="post"
                    onSubmit={e => {
                        handleSubmit(e)
                        navigate(`/app/profile`)
                    }}
                >
                    <div class="field">
                    <label for="" class="label">email</label>
                    <div class="control has-icons-left">
                        <input type="email" placeholder="e.g. john" class="input" name="email" onChange={handleChange} required />
                        <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                        </span>
                    </div>
                    </div>
                    <div class="field">
                    <label for="" class="label">Password</label>
                    <div class="control has-icons-left">
                        <input type="password" placeholder="*******" class="input" name="password" onChange={handleChange} required />
                        <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                        </span>
                    </div>
                    </div>
                    <div class="field">
                    <label for="" class="checkbox">
                        <input type="checkbox" name="checkbox" onChange={handleChecked} />
                        Remember me
                    </label>
                    </div>
                    <div class="field">
                    <button class="button is-success" style={{backgroundColor:'green'}}>
                        Login
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}


