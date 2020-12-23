import React, {useState, useEffect} from "react"
import { connect } from 'react-redux'
import { graphql, StaticQuery, navigate } from "gatsby"
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Img from 'gatsby-image'
import { ContactlessOutlined, ContactsOutlined } from "@material-ui/icons";
import {edgesSelected, imagesJsonYear, imagesJsonOlderThanYear} from '../components/edgesSelected'



const backgroundColor="#FF7034"

const offset = 8

const styles = {
  root:{
    marginTop:'0.45rem',
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
  const handleMouseEnter = (name) => setHover({...hover, [name]:undefined /*true*/})
  const handleMouseLeave = (name) => setHover({...hover, [name]:undefined})
  const handleNavigate = e => {
    e.stopPropagation()
    navigate('/')
  }
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
            // const edges = edgesSelected(data.allImageSharp.edges, year, filterFunc)
            const edges = data.allImageSharp.edges

            const edgesThumbnails =  edges.length <= offset?edges
            :edges.length > 0?edges.find((it, index) => (index >= startIndex && index < startIndex + offset))?edges
            :[...edges.slice(0, startIndex), {...edges[startIndex], open:true}, ...edges.slice(startIndex + 1)]
            :[]

            const previous = () => {
              const newStartIndex = Math.max(startIndex-offset, 0)
              setStartIndex(newStartIndex)
              setOpen(newStartIndex)
            }

            const next = () => {
              const newStartIndex = (startIndex + offset <= edges.length)?startIndex + offset: startIndex
              setStartIndex(newStartIndex)
              setOpen(newStartIndex)
            }

            const handleNavigate = e => {
              e.stopPropagation()
              navigate('/')
            }
            const openMin = Math.min(open, edgesThumbnails.length-1)
            const fluid = edgesThumbnails.length > 0?edgesThumbnails[openMin].node.fluid:undefined
            const imageJson = edgesThumbnails.length > 0?edgesThumbnails[openMin].imageJson:undefined

            console.log('length:', edgesThumbnails.length, 'openMin', openMin, 'fluid:', fluid, 'imageJson', imageJson)
            
            return (
              <>
                <div style={styles.root} >
                  {fluid?
                    <div className="columns is-centered" onClick={handleNavigate}>
                        <div className={"column is-12-mobile is-10-tablet is-9-desktop is-8-widescreen columns is-centered"}>
                            <figure className={hover["column"]} onMouseEnter={()=>handleMouseEnter('bigPic')} onMouseLeave={()=>handleMouseLeave('bigPic')}>
                              <div style={{position:'relative'}}>
                                <Img className = "image" fluid={fluid} backgroundColor={backgroundColor} style={{position:'relative', objectFit: 'cover', width:'100vh', height:'50vh', marginLeft:'auto', marginRight:'auto'}}/>
                                <div style={{position:'absolute', opacity:0.4, bottom:4, right:8, fontSize:'xx-small', color:'white'}}>
                                  Photo:{imageJson?imageJson.photo?imageJson.photo:'Pehr Rafstedt':'Pehr Rafstedt'}
                                </div>  
                              </div>
                              <figcaption className="has-text-light" style={{opacity:1.0}}>
                                <small style={{fontWeight:100}}>
                                {imageJson?imageJson.name?imageJson.name:"No text":"No text in imageJson"}
                                </small>
                                <br />
                                <small style={{fontWeight:100}}>{TEXTS.SIZE[props.language]}:{imageJson?imageJson.size:0}&nbsp;{TEXTS.PRICE[props.language]}:{imageJson?imageJson.price:0}</small>
                              </figcaption>
                            </figure>
                        </div>  
                    </div>  
                  :
                     <h2>No open image</h2>
                  }

                  {edgesThumbnails.length > 0?
                    <div className={"columns is-centered is-multiline"}>
                        <div className={"column is-12-mobile is-12-tablet is-10-desktop is-6-widescreen columns is-left"}>
                          <div className={"column is-hidden-mobile is-6-tablet is-5-desktop is-half-widescreen columns"} style={{cursor:'pointer'}}>
                            <div className={"column is-hidden-mobile is-4-tablet"} style={{paddingTop:0, cursor:'pointer', color:'white'}}>
                              <Img className = "image is-96x96"  objectFit="cover" objectPosition="50% 50%" fluid={fluid} backgroundColor={backgroundColor} />
                            </div>  
                            <div className={"column is-hidden-mobile is-8-tablet"} style={{paddingTop:0, cursor:'pointer', color:'white', fontSize:'x-small'}}>
                              Abcdefgh Abcdefgh  Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh 
                              Abcdefgh Abcdefgh  Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh Abcdefgh 
                            </div>  
                          </div>  
      1                   <div className="column is-fullscreen-mobile is-6-tablet is-7-desktop is-half-widescreen columns is-mobile is-right is-multiline">
                            {edgesThumbnails.map((it, ix)=>
                              (ix >= startIndex && ix < startIndex + offset) ?
                                <div className={"column is-3"} style={{cursor:'pointer', paddingTop:0}} onClick={(e)=>{e.stopPropagation(); setOpen(ix)}}>
                                    <Img className = "image is-96x96"  objectFit="cover" objectPosition="50% 50%" fluid={it.node.fluid} backgroundColor={backgroundColor} />
                                </div>  
                              :
                                null  
                            )}
                            <div className="column is-12 columns is-centered">
                                {edgesThumbnails.length > offset?
                                  <div className="buttons" >
                                      {startIndex!==0?
                                        <div className="button is-dark is-small" onClick={previous} style={{cursor:'pointer'}}>
                                          <NavigateBeforeIcon />
                                        </div>
                                      :
                                        null  
                                      } 
                                      {edgesThumbnails.length - startIndex > offset?
                                        <div className="button is-dark is-small" onClick={next}>
                                          <NavigateNextIcon />
                                        </div>
                                      :
                                        null  
                                      }          
                                  </div>
                                :null}
                            </div>
                          </div>  
                        </div>  
                    </div>
                    :
                      <h2>No images in list</h2>

                  }  
                  
                </div>
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


