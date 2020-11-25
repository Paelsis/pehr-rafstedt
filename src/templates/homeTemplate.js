import React, {useState, useEffect} from "react"
import { connect } from 'react-redux'
import { graphql, StaticQuery } from "gatsby"
import { navigate } from "gatsby"
import Img from 'gatsby-image'
import variables from "../components/layout.scss";

const backgroundColor="#FF7034"


const styles = {
  root:{
    marginTop:0,
  },
  image: (im) =>({
    maxHeight:im.large?'80vh':'65vh',
    transform: im.rotate?'rotate(' + im.rotate + 'deg)':null,
    transition:'500ms all ease'
  }),
}

const TEXTS = {
  SIZE:{SV:'Storlek', EN:'Size'},
  HEIGHT:{SV:'Höjd', EN:'Height'},
  WIDTH:{SV:'Bredd', EN:'Width'},
  PRICE:{SV:'Pris', EN:'Price'},

}



// Two functions that can serve as imagesJsonFilter
const Template = (props) => {
  const [hover, setHover] = useState({})
  // console.log('startIndex reset', startIndex)
  const handleMouseEnter = (index) => setHover({...hover, [index]:true})
  const handleMouseLeave = (index) => setHover({...hover, [index]:undefined})
  const handleClick = (index) => {
      switch(index) {
        case 0:navigate('/history')
          break;
        case 1:navigate('/gallery')
          break;
      }
    }
    // const checkboxOpen = (ix) => setList([...edges.slice(0, ix), {...edges[ix], open:edges[ix].open?undefined:true}, ...edges.slice(ix + 1)])
  return(
  <StaticQuery
          query={graphql`
          {
            allImageSharp(filter: {fluid: {originalName: {regex: "/R[1-9]/"}}}, sort: {fields: fixed___originalName, order: ASC}) {
              edges {
                node {
                  fluid {
                    originalName
                  }
                }
              }
            }
          }
                    `}
          render={data => {
            return (
              <>
                  <div className="columns is-mobile is-multiline is-centered is-vcentered" style={{height:'100vh'}} >
                  {data.allImageSharp.edges.map((it, index)=>
                        <div 
                          className={"is-half-mobile"}
                          style={{
                            textAlign:'center',
                            paddingTop:'8vh',
                            verticalAlign:'middle',
                            cursor:'pointer', 
                            marginRight:index===0?10:'auto',
                            marginLeft:index===0?'auto':10,
                            height:'20vh', 
                            width:'20vh',
                            color:'yellow', 
                            backgroundColor: index===0?variables.orange:variables.pink,
                            zIndex:1000
                          }} 
                          onClick={()=>handleClick(index)}
                        >
                          <h4>{it.node.fluid.originalName}</h4>
                        </div>
                      )}
                  </div>
              </>
              )
            }}
        />
)}

// <Img fluid={it.node.fluid} />

// Map the dispatch to onMyClick
const mapStateToProps = (state) => {
  return {
    language:state.language
  }
}    

export default connect(mapStateToProps)(Template)


