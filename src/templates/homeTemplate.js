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

const obblack = "rgba(43,19,17, 0.4)"
const orange = "#FF7034"
const pink = "#FF48A5"



// Two functions that can serve as imagesJsonFilter
const Template = (props) => {
  const [hover, setHover] = useState({})
  // console.log('startIndex reset', startIndex)
  const handleMouseEnter = (index) => setHover({...hover, [index]:true})
  const handleMouseLeave = (index) => setHover({...hover, [index]:undefined})
  const backgroundColor1 = variables.orange
  const backgroundColor2 = variables.bubblegumPink
  const color1 = variables.bblack
  const color2 = variables.nblack
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
                          className={"is-6-mobile"}
                          style={{
                            paddingTop:'8vh',
                            textAlign:'center',
                            verticalAlign:'middle',
                            cursor:'pointer', 
                            marginRight:index===0?10:undefined,
                            marginLeft:index===0?undefined:10,
                            height:'20vh', 
                            width:'20vh',
                            color:index===0?color1:color2,
                            backgroundColor: index===0?backgroundColor1:backgroundColor2,
                          }} 
                          onClick={()=>handleClick(index)}
                        >
                          <h2>{it.node.fluid.originalName}</h2>
                          <h4>Index : {index}</h4>
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


