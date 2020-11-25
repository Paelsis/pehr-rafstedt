import React from "react"
import { connect } from 'react-redux'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Template from '../templates/historyTemplate'

const func = ({language}) =>
    <Layout>
        <SEO title="About me" />
        <Template language={language}/>
    </Layout>

// Map the dispatch to onMyClick
const mapStateToProps = (state) => {
    return {
        language:state.language
    }
}    
  
export default connect(mapStateToProps)(func) 
  