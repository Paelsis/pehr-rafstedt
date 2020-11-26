import React, {useState} from "react"
import { graphql, StaticQuery, navigate } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import variables from "../components/layout.scss" 

const src = `https://source.unsplash.com/random/600x600`  
const bblack = '#2b2523'



export default (props) => {
  const [hover, setHover] = useState({})
  const Hline = ({leftText, rightText}) =>
    <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
      {leftText?<div style={{float:'left', marginTop:'auto', fontSize:20}}>{leftText}</div>:null}
      {rightText?<div style={{float:'right', marginTop:'auto', fontSize:10}}>{rightText}</div>:null}
    </div>
  const handleMouseEnter = (name) => setHover({...hover, [name]:undefined})
  const handleMouseLeave = (name) => setHover({...hover, [name]:undefined})

  return (
    <StaticQuery
      query={graphql`{
        allMarkdownRemark(filter: {frontmatter: {language: {}, slug: {regex: "/history/"}}}, sort: {fields: frontmatter___date, order: ASC}) {
          nodes {
            frontmatter {
              title
              slug
              date
              year
              src
              language
            }
            html
          }
        }
        allImageSharp(filter: {fluid: {originalName: {regex: "/HISTORY/"}}}, sort: {order: ASC, fields: resolutions___originalName}) {
          edges {
            node {
              fluid {
                originalName
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }

      }
    `}

    render={data => {
      const edges = data.allImageSharp.edges
      const fluid = (index) => edges?edges[Math.min(index, edges.length-1)].node.fluid:null
      const handleClick = () => navigate('/')
      return(
          <>
            {data.allMarkdownRemark.nodes.filter((it) => it.frontmatter.language === props.language).map((it, index) =>
              <div style={{color:variables.orange}} onClick={handleClick}>
                <div className="columns">
                  <div className="column is-one-third is-offset-1" 
                    style={{backgroundColor:hover['div1']?undefined:undefined, transition:'2000ms all ease'}} 
                    onMouseLeave={()=>handleMouseLeave('div1')}
                  >
                    {fluid?  
                      <Img fluid={fluid(index)} backgroundColor={"grey"} style={{cursor:'pointer'}} />
                    :null}  
                  </div>
                  <div 
                      className="column is-5 is-offset-2"
                      onMouseEnter={()=>handleMouseEnter('div2')}
                      onMouseLeave={()=>handleMouseLeave('div2')}
                  >
                      <Hline leftText={it.frontmatter.title} rightText={undefined} />
                      <hr style = {{width:'100%', backgroundColor:variables.orange, height:'2px'}}/>
                      <div dangerouslySetInnerHTML={{ __html:it.html}} />
                  </div>
                </div>
                <div style={{color:'white', height:20}} />            
              </div>
            )}
          </>
      )
    }}
    />
  )      
  
}

