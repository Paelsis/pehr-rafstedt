import React from "react"
import { connect } from 'react-redux'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Template from "../templates/contactTemplate"

const func = ({language}) => 
    <Layout>
        <SEO title="Contact" />
        <Template language={language} />
    </Layout>

const mapStateToProps = (state) => {
  return {
      language:state.language
  }
}    

export default connect(mapStateToProps)(func) 

