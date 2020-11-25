import React from "react"
import { connect } from 'react-redux'
import {LANGUAGE_EN, LANGUAGE_SV, setLanguage} from '../state/reducers/language'

const func = (props) => {
    const {language, setLanguage} = props
    const handleClick = () => setLanguage(language===LANGUAGE_EN?LANGUAGE_SV:LANGUAGE_EN)
    return(
        <span onClick={(handleClick)}>
            {language===LANGUAGE_EN?"Swedish":"Engelska"}
        </span>
    )
}

const mapStateToProps = (state) => {
    return {
      language:state.language
    }
}    
  
// Map the dispatch to onMyClick
const mapDispatchToProps = (dispatch) => {
  return {
      setLanguage: (language) => {dispatch(setLanguage(language))},
  }        
}
  
export default  connect( 
  mapStateToProps,
  mapDispatchToProps,
) (func);    
  