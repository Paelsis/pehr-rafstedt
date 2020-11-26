import React, {useState, useEffect} from "react"
import { connect } from 'react-redux'
import { graphql, StaticQuery } from "gatsby"
import { navigate } from "gatsby"
import Img from 'gatsby-image'
//import variables from "../components/layout.scss";

const VARIABLES =  {
  obblack:"rgba(43,19,17, 0.4)",
  orange:"#FF7034",
  pink:"#FF48A5",
  bubblegumPink:'#ff0081',
}

const styles = {
  root:{
    marginTop:0,
  },
  image: im =>({
    maxHeight:im.large?'80vh':'65vh',
    transform: im.rotate?'rotate(' + im.rotate + 'deg)':null,
    transition:'500ms all ease'
  }),
  square: index => ({
    paddingTop:'8vh',
    textAlign:'center',
    verticalAlign:'middle',
    cursor:'pointer', 
    marginRight:index===0?15:undefined,
    marginLeft:index===0?undefined:15,
    height:'20vh', 
    width:'20vh',
    transform: 'rotate(-18deg)',
    color: index===0?VARIABLES.obblack:VARIABLES.obblack,
    backgroundColor: index===0?VARIABLES.orange:VARIABLES.bubblegumPink,
  }) 
}

// Two functions that can serve as imagesJsonFilter
const Template = () => {
  const [hover, setHover] = useState({})
  /*
  useEffect(() => {
        setHover({[0]:undefined, [1]:undefined})
  }, [])
  */
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
                          className={"is-6-mobile"}
                          style={styles.square(index)}
                          onClick={()=>handleClick(index)}
                        >
                          <h2>{it.node.fluid.originalName}</h2>
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


