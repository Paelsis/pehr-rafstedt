import React, {useState} from "react"
import { connect } from 'react-redux'
import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import {LANGUAGE_EN, LANGUAGE_SV, setLanguage} from '../state/reducers/language'
import {setZoom} from '../state/reducers/zoom'
import { getUser, logout } from "../services/auth"
import variables from "../components/layout.scss";



const TEXTS = {
  HOME:{
    [LANGUAGE_SV]:'Hem',
    [LANGUAGE_EN]:'Home'
  },
  ALL:{
    [LANGUAGE_SV]:'Alla bilder',
    [LANGUAGE_EN]:'All pictures'
  },
  HISTORY:{
    [LANGUAGE_SV]:'Om mig',
    [LANGUAGE_EN]:'About me'
  },
  LANGUAGE:{
    [LANGUAGE_SV]:"Engelska",
    [LANGUAGE_EN]:"Swedish",
  },
  CONTACT:{
    [LANGUAGE_SV]:'Kontakta mig',
    [LANGUAGE_EN]:'Contact me'
  },
  MY_PROFILE:{
    [LANGUAGE_SV]:'Min Profil',
    [LANGUAGE_EN]:'My Profile'
  },
  LOGOUT:{
    [LANGUAGE_SV]:'Logout',
    [LANGUAGE_EN]:'Logout'
  },
  LOGIN:{
    [LANGUAGE_SV]:'Login',
    [LANGUAGE_EN]:'Login'
  },
  NOT_LOGGED_IN:{
    [LANGUAGE_SV]:'Du är inte inloggad',
    [LANGUAGE_EN]:'You are not logged in'
  },
  MY_PROFILE:{
    [LANGUAGE_SV]:'Min profil',
    [LANGUAGE_EN]:'My profile'
  },
  YOU_ARE_LOGGED_IN:{
    [LANGUAGE_SV]:'Du är inloggad som ',
    [LANGUAGE_EN]:'You logged in as '
  },
  GALLERIES:{
    [LANGUAGE_SV]:'Gallerier',
    [LANGUAGE_EN]:'Galleries'
  },
  OLDER_IMAGES:{
    [LANGUAGE_SV]:'Äldre',
    [LANGUAGE_EN]:'Older'
  },
}

const Func = ({galleries,language, setLanguage, loggedIn}) => {
  const [objActive, setObjActive] = useState({})
  const [hover, setHover] = useState({})
  const handleMouseEnter = (name) => setHover({...hover, [name]:true})
  const handleMouseLeave = (name) => setHover({...hover, [name]:undefined})
  const toggleHamburger = (e) => {
    setObjActive({active:!objActive.active, navBarActiveClass:!objActive.active?'is-active':''})
  }
  const handleLanguage = () => setLanguage(language===LANGUAGE_EN?LANGUAGE_SV:LANGUAGE_EN)
  const handleLogout = e =>  {
    e.preventDefault()
    logout(() => navigate(`/app/login`))
  }
  const handleLogin = e =>  {
    console.log('Hello there')
    e.preventDefault()
    navigate(`/app/login`)
  }
  const lastGalleryYear = galleries[galleries.length-1]
return(

<nav 
  class="navbar is-full is-transparent"  role="navigation" aria-label="main navigation"
  style={{color:variables.obblack, opacity:hover?0.9:0.1}}
>
  <div
    className={`navbar-burger burger ${objActive.navBarActiveClass}`}
    data-target="navMenu"
    onClick={e => toggleHamburger(e)}
  >
    <span />
    <span />
    <span />
  </div>
  {loggedIn?
    <div className={`navbar-start is-hidden-touch`} style={{marginTop:0, height:20 }}>
      <div className='navbar-brand' style={{padding:0, marginTop:0}}>
        <img className='column'src={getUser().photoURL} alt="" style={{position:'relative', borderRadius:"50%", height:60}} />
      </div>
      <div className={'navbar-item'} style={{height:60, padding:0, marginTop:0, vertialAlign:'center'}}>
        <small className='column'>{TEXTS.YOU_ARE_LOGGED_IN[language] +  getUser().displayName}</small>
      </div>
    </div>
  :null}
  
  <div className={`navbar-menu navbar-end ${objActive.navBarActiveClass}`}
    onMouseEnter={()=>handleMouseEnter('nav')} 
    onMouseLeave={()=>handleMouseLeave('nav')}
    style={{fontWeight:100, fontSize:14, opacity:hover.nav?0.7:0.7}}
  >
    <Link to="/" className="navbar-item">
      {TEXTS.HOME[language]}
    </Link>
  
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link is-arrowless">
        {TEXTS.GALLERIES[language]}
      </a>

      <div class="navbar-dropdown">
        {galleries.map(year => 
          <Link to={`/gallery?${year}`} className="navbar-item">
            {year}
          </Link>
        )}
        <Link to={`/gallery?${lastGalleryYear}&olderThan`} className="navbar-item">
          {TEXTS.OLDER_IMAGES[language]}
        </Link>
      </div>
    </div>
    <Link to="/images/" className="navbar-item">
      {TEXTS.ALL[language]}
    </Link>
    <Link to="/history/" className="navbar-item">
      {TEXTS.HISTORY[language]}
    </Link>
    <Link to="/contact/" className="navbar-item">
      {TEXTS.CONTACT[language]}
    </Link>
    <a className="navbar-item" onClick={handleLanguage}>
      {TEXTS.LANGUAGE[language]}
    </a>
    {loggedIn?
      <Link to="/app/profile/" className="navbar-item">
        {TEXTS.MY_PROFILE[language]}
      </Link>
    :null
    }  
    {loggedIn?
      <a className="navbar-item" onClick={handleLogout}>
        {TEXTS.LOGOUT[language]}
      </a>
      :
      <a className="navbar-item" onClick={handleLogin} >
        {TEXTS.LOGIN[language]}
      </a>
    }  
  </div>
</nav>
)}

const mapStateToProps = (state) => {
  return {
    language:state.language
  }
}    

// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
  return {
      setLanguage: (language) => {dispatch(setLanguage(language))},
      setZoom: (zoom) => {dispatch(setZoom(zoom))},
  }        
}

export default  connect( 
  mapStateToProps,
  mapDispatchToProps,
) (Func);    




