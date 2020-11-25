import React, {useState} from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Template from '../templates/homeTemplate'

export default () => 
    <Layout>
        <SEO title="Home" />
        <Template />
    </Layout>

