import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { fromUnixTime } from "date-fns"

export default function Template1()
 {
  return (
    <StaticQuery
    query={graphql`
    query MySecondQuery {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              year
              slug
              src
              title
            }
            headings {
              value
            }
          }
        }
      }
    }
    `}
    render={data => (
      <div className="blog-post-container">
        {data.allMarkdownRemark.edges.map(it =>
          <div className="blog-post">
            <h1>{it.node.frontmatter.title}</h1>
            <h2>{it.node.frontmatter.year}</h2>
            <h3>{it.node.frontmatter.src?it.node.frontmatter.src:'No src'}</h3>
            <img src={it.node.frontmatter.src} />
            {it.node.headings.map(he=>
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: he.value }}
              />
            )}  
          </div>
        )} 
      </div>
    )}
    />
  )}
            

