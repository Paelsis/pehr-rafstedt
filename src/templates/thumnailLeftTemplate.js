import React, {useState, useEffect} from "react"
import { connect } from 'react-redux'
import { graphql, StaticQuery, navigate} from "gatsby"
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Img from 'gatsby-image'
import { ContactlessOutlined } from "@material-ui/icons";
import {edgesSelected, imagesJsonYear, imagesJsonOlderThanYear} from '../components/edgesSelected'
import variables from "../components/layout.scss" 



const backgroundColor="#FF7034"

const offset = 12

const styles = {
  root:{
    marginTop:'0.45rem',
    color:variables.orange
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
  const [startIndex, setStartIndex] = useState(0);
  const [open, setOpen] = useState(0)
  const [hover, setHover] = useState({})
  useEffect(() => {
    setOpen(0)
    setStartIndex(0)
  }, [props.year, props.olderThan])
  // console.log('startIndex reset', startIndex)
  const handleMouseEnter = (name) => setHover({...hover, [name]:true})
  const handleMouseLeave = (name) => setHover({...hover, [name]:undefined})
  // const checkboxOpen = (ix) => setList([...edges.slice(0, ix), {...edges[ix], open:edges[ix].open?undefined:true}, ...edges.slice(ix + 1)])
  return(
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
            const year = props.year?props.year:undefined
            const filterFunc = props.olderThan?imagesJsonOlderThanYear:imagesJsonYear
            const edges = edgesSelected(data.allImageSharp.edges, year, filterFunc)


            const edgesRange =  edges.length <= startIndex?edges
            :edges.length >0?edges.find((it, index) => (index >= startIndex && index < startIndex + offset))?edges
            :[...edges.slice(0, startIndex), {...edges[startIndex], open:true}, ...edges.slice(startIndex + 1)]:[]
            const previous = (e) => {
              e.stopPropagation()
              const newStartIndex = Math.max(startIndex-offset, 0)
              setStartIndex(newStartIndex)
              setOpen(newStartIndex)
            }
            const next = (e) => {
              e.stopPropagation()
              const newStartIndex = (startIndex + offset <= edges.length)?startIndex + offset: startIndex
              setStartIndex(newStartIndex)
              setOpen(newStartIndex)
            }
            const handleClick = (e) => {e.stopPropagation(); navigate('/')}
            const openMin = Math.min(open, edgesRange.length-1)
            const fluid = edgesRange.length > 0?edgesRange[openMin].node.fluid:undefined
            const imageJson = edgesRange.length > 0?edgesRange[openMin].imageJson:undefined
            return (
              <>
              {fluid?
                  <div style={styles.root} className="columns is-centered" onClick={handleClick}>
                    <div className={hover['bigPic']?"column is-full-mobile is-one-third-tablet is-one-quarter-desktop":"column is-full-mobile is-one-third-tablet is-one-third-desktop"}>
                      <div className="columns is-centered is-multiline is-mobile">
                        {
                          edgesRange.map((it, ix)=>
                          (ix >= startIndex && ix < startIndex + offset) ?
                            <div className={"column is-2-mobile is-one-third-tablet"} style={{cursor:'pointer'}} onClick={(e)=>{e.stopPropagation(); setOpen(ix)}} >
                                <Img fluid={it.node.fluid} backgroundColor={backgroundColor} />
                            </div>  
                          :
                            null  
                          )
                        }
                      </div>
                      {edgesRange.length > offset?
                        <div className="buttons" >
                            {startIndex!==0?
                              <div className="button is-light" onClick={previous} style={{backgroundColor:variables.orange, cursor:'pointer'}}>
                                <NavigateBeforeIcon />
                              </div>
                            :
                              null  
                            } 
                            {edgesRange.length - startIndex > offset?
                              <div className="button is-light" onClick={next} style={{backgroundColor:variables.orange, cursor:'pointer'}}>
                                <NavigateNextIcon />
                              </div>
                            :
                              null  
                            }          
                        </div>
                      :null}
                    </div>
                    <div className={hover['bigPic']?"column is-offset-0":"column is-offset-1"} onMouseEnter={()=>handleMouseEnter('bigPic')} onMouseLeave={()=>handleMouseLeave('bigPic')}>
                      <figure>
                        <Img fluid={fluid} backgroundColor={backgroundColor} style={{width:'auto', objectFit:'cover'}}/>
                        {imageJson?
                          <figcaption className="has-text-dark" style={{opacity:!imageJson.hover || hover['bigPic']?1.0:0, transition:'1500ms all ease', fontWeight:100}}>
                            <small style={{fontWeight:100}}>
                            {imageJson.name?imageJson.name:"No text"}
                            </small>
                            <br />
                            <small style={{fontWeight:100}}>{TEXTS.SIZE[props.language]}:{imageJson.size}&nbsp;{TEXTS.PRICE[props.language]}:{imageJson.price}</small>
                          </figcaption>
                        :null}
                      </figure>
                    </div>
                  </div>
              :<h2>No pictures from this period</h2>}
              </>
              )
            }}
        />
)}


// Map the dispatch to onMyClick
const mapStateToProps = (state) => {
  return {
    language:state.language
  }
}    

export default connect(mapStateToProps)(Template)


