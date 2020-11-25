import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Template from '../templates/thumnailLeftTemplate'
import "../components/layout.scss"
import { isLoggedIn } from "../services/auth"


export default ({galleries, location}) => {
    const search = location.search?location.search:undefined
    const year = search?search.split('?')[1].split('&')[0]:undefined
    const olderThan = search?search.indexOf('olderThan') !== -1?"olderThan":undefined:undefined
    console.log('year', year, 'olderThan', olderThan)
    const loggedIn = isLoggedIn()
    return(
    <Layout>
        <SEO title={"Gallery " + year} />
        <div style={{position:'relative', top:-10, textAlign:'center'}}>
            <span style={{fontFamily:'Roboto', fontSize:'2.4em', color:'hsla(43, 36%, 85%, 1)'}}>{olderThan?"Older than ":""} {year}</span>
        </div> 
        <Template year={year} olderThan={olderThan} />
    </Layout>
    )
}

//<span style={{fontFamily:'broadcastmatter', fontSize:'2.2em', color:'hsla(43, 36%, 90%, 1)'}}>{olderThan?"Older than ":""} {year}</span>
