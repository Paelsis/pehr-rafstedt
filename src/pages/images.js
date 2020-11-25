import React, {useState} from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Template from '../templates/imagesTemplate'


export default () =>
    <Layout>
        <SEO title="All pictures" />
        <Template />
    </Layout>
