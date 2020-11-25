import React, {useState} from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import { NavigateBeforeSharp } from "@material-ui/icons"
import {edgesSelected, imagesJsonAnyYear} from '../components/edgesSelected'


const backgroundColor="#FF7034"

const CLASS_NAME = {
  SMALL:{
    NO_CLICK:"column is-1 is-12-mobile",
    CLICK:"column is-half is-12-mobile"
  },
  NORMAL:{
    NO_CLICK:"column is-2 is-2 is-12-mobile",
    CLICK:"column is-two-thirds is-12-mobile"
  },
  LARGE:{
    NO_CLICK:"column is-3 is-12-mobile",
    CLICK:"column is-three-quarters is-12-mobile"
  },

}

export default () => {
      const [hover, handleHover] = useState(undefined) 
      const [open, setOpen] = useState(undefined) 
      const [size, setSize] = useState(0)
      return (
        <StaticQuery
          query={graphql`
          {
            allImageSharp(sort: {order: ASC, fields: resolutions___originalName}) {
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
            const edges = edgesSelected(data.allImageSharp.edges, undefined, imagesJsonAnyYear)
            const imageJson = open?edges[open].imageJson:undefined
            return (
              <div className="columns is-multiline" >
                 <div className="column is-12 is-hidden-mobile" style={{top:-299}}>
                 <span onClick={()=>setSize(size > -1?size-1:size)} >  
                   <ZoomOutIcon size="small" style={{opacity:0.3}} />
                  </span>  
                  &nbsp;
                  <span  onClick={()=>setSize(size < 1?size+1:size)} >
                    <ZoomInIcon size="small" style={{opacity:0.3}}/>  
                  </span>
                 </div>  
                 {edges.map((it, index)=>
                  <div 
                    className={
                      size===-1?open===index?CLASS_NAME.SMALL.CLICK:CLASS_NAME.SMALL.NO_CLICK
                      :size===1?open===index?CLASS_NAME.LARGE.CLICK:CLASS_NAME.LARGE.NO_CLICK
                      :open===index?CLASS_NAME.NORMAL.CLICK:CLASS_NAME.NORMAL.NO_CLICK
                    }
                    style={{opacity:hover===it.node.fluid.originalName?1.0:1.5, transition:'100ms all ease', cursor:'pointer'}} 
                    onMouseEnter={()=>handleHover(it.node.fluid.originalName)}
                    onMouseLeave={()=>handleHover(undefined)}
                    onClick={()=>setOpen(open?undefined:index)}
                  >
                    <Img fluid={it.node.fluid} backgroundColor={backgroundColor} style={{cursor:'pointer'}} />
                    {open === index?
                      <small>{imageJson?imageJson.name + ' / ' + imageJson.price + ' / ' + imageJson.size:null}</small>
                    :  
                      <small>{it.imageJson.name?it.imageJson.name:'(Filename:' + it.node.fluid.originalName + ')'}</small>
                    }  
                    </div>
                )}
              </div>
            )
          }}
        />
      )
  }
  

