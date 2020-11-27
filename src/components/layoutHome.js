/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { isLoggedIn } from "../services/auth"
import "./layout.scss"

const Layout = ({location, children }) => {
  const loggedIn = isLoggedIn()
  const data = useStaticQuery(graphql`
  query SiteTitleQuery22 {
    site {
      siteMetadata {
        title
        galleries
      }
    }
  } 
  `)
  const title = data.site.siteMetadata.title
  const galleries = data.site.siteMetadata.galleries
  return (
    <>
      <div class="container is-widescreen">
        <h1 style={{color:'white'}}>{location?location.pathname:null}</h1>
        <main style={{paddingLeft:10, paddingRight:10}}>{children}</main>
        <footer style={{fontWeight:100, fontSize:8, color:'orange', marginTop: `2rem`}}>
          © {new Date().getFullYear()}, 
          {` `}
          <a href="mailto:pr@rafstedt.se">Pehr Rafstedt</a>
        </footer>
       </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

