import React, {useState} from "react"
import { StaticQuery, graphql } from "gatsby"

const bblack = '#2b2523'

const Hline = ({header, year}) =>
<div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
  <div style={{float:'left', marginTop:'auto', fontSize:20}}>{header}</div>
  <div style={{float:'right', marginTop:'auto', fontSize:10}}>{year}</div>
</div>

export default () => {
  const [hover, setHover] = useState({})
  const handleMouseEnter = (name) => setHover({...hover, [name]:true})
  const handleMouseLeave = (name) => setHover({...hover, [name]:undefined})
  return (
    <StaticQuery
    query={graphql`
    query MyQuery {
      allMarkdownRemark(sort: {fields: id, order: DESC}) {
        edges {
          node {
            frontmatter {
              year
              slug
              src
              title
            }
            html
          }
        }
      }
    }
    `}
    render={data => (
      <div>
        {data.allMarkdownRemark.edges.map(it =>
          <div>
            <div className="columns">
              <div style={{backgroundColor:hover['div1']?bblack:undefined, transition:'2000ms all ease'}} 
                className="column is-one-fifth is-offset-1" 
                onMouseEnter={()=>handleMouseEnter('div1')}
                onMouseLeave={()=>handleMouseLeave('div1')}
              >
                <img src={it.node.frontmatter.src} alt={'Image'} style={{opacity:hover['div1']?0.5:1.0,  padding:0, transition:'2000ms all ease'}} />
              </div>
              <div 
                className="column is-5 is-offset-2"
                onMouseEnter={()=>handleMouseEnter('div2')}
                onMouseLeave={()=>handleMouseLeave('div2')}
              >
                <Hline header={it.node.frontmatter.title} year={it.node.frontmatter.year} />
                <hr style = {{width:'100%', backgroundColor:'lightBlue', height:'2px'}}/>
                <div dangerouslySetInnerHTML={{ __html:it.node.html}} />
              </div>
            </div>
            <div style={{color:'white', height:20}} />            
          </div>
        )}
      </div>
    )}
    />
  )
}
