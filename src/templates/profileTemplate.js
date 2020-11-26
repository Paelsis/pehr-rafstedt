import React, {useState, useEffect} from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from 'gatsby-image'
import imagesJson from '../../src/images/images.json'
import OpacityText from '../components/OpacityText'
import {axiosGet, axiosPost} from "../functions/axios"
import { useTheme } from "@material-ui/core"



const backgroundColor="#FF7034"
const REMOTE_FILE='rafstedt.json'

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

export default (props) => {
      const [arr, setArr] = useState([])
      const [submit, setSubmit] = useState(0)
      const [buttonColor, setButtonColor] = useState({fetch:'orange', submit:'orange'})
      /*
      useEffect(() => {
        axiosGet('/getJsonFromFile', (data) => data.result.length >= imagesJson.length?setArr(data.result):null)
      })
      */
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

            const handleSubmit = (e) => {
              setButtonColor({...buttonColor, submit:'pink'})
              const payload = {
                fname:REMOTE_FILE,
                array:arr
              }
              axiosPost('/setJsonInFile', payload, (reply) => {
                setSubmit(submit+1)
                setButtonColor({...buttonColor, submit:'orange'})
              })  
              e.preventDefault();
            }

            const value = (it, key) => {
              const originalName = it.node.fluid.originalName.split('.')[0]
              const found = arr?arr.length >0?arr.find(it => it.originalName === originalName):undefined:undefined
              return found?found[key]?found[key]:'':''
            }

            const handleChange = (e, index) => {
              const newArr = data.allImageSharp.edges.map((it, ix) => {
                const originalName = it.node.fluid.originalName.split('.')[0];
                if (index === ix) {
                  return arr[ix]?{...arr[ix], [e.target.name]:e.target.value}:{originalName, [e.target.name]:e.target.value}
                } else {
                  return arr[ix]?{...arr[ix]}:{originalName}
                }  
              })  
              setArr(newArr)
            }

            const handleFetch = (e) => {
              setButtonColor({...buttonColor, fetch:'pink'})
              axiosGet('/getJsonFromFile?fname=' + REMOTE_FILE, (axiosData) => {
                  console.log('jsonArray:', axiosData.result)
                  const newArr = data.allImageSharp.edges.map(it => {
                      const originalName = it.node.fluid.originalName.split('.')[0]
                      const jsFound = axiosData.result.find(ax => ax.originalName  === originalName)
                      if (jsFound!==undefined) {
                        return {...jsFound}
                      } else {
                        return {originalName}
                      }     
                  })
                  setButtonColor({...buttonColor, fetch:'orange'})
                  setArr(newArr)  
              })
            }

            const handleFetchStatic = (e) => {
              const newArr = data.allImageSharp.edges.map(it => {
                const originalName = it.node.fluid.originalName.split('.')[0]
                const jsFound = imagesJson.find(im => im.originalName  === originalName)
                if (jsFound!==undefined) {
                  return {...jsFound}
                } else {
                  return {originalName}
                } 
              })      
              setArr(newArr)  
            }
            


           const handleReset = (e) => {
              e.preventDefault()
              setArr([])
            }

            const handleInit = (e) => {
              e.preventDefault()
              setArr([])
            }


            return (
              <div>
                <button className="button" type="button" style={{backgroundColor:'orange', color:'white'}} onClick={handleFetchStatic}>Hämta data från statisk fil</button>
                <a href={"mailto:paelsis@hotmail.com?subject=Bildere&body=" + JSON.stringify(arr, null, "\t")}>
                  <button className="button" style={{backgroundColor:'orange', color:'white'}} >Skicka ändrade data i mail till Per</button>
                </a>
              <p />
              <OpacityText title={"KNUDS CHANGES"} text={"HERE KNUD CHANGE THE INFO ABOUT HIS IMAGES AND SEND THEM TO PÄLZ"} />
              <form onSubmit={handleSubmit}>
                <button className="button" type="button" style={{backgroundColor:buttonColor.fetch, color:'white'}} onClick={handleFetch}>Hämta data från fil</button>
                <button className="button" type="submit" style={{backgroundColor:buttonColor.submit, color:'white'}} >Spara data i fil</button>
                <button className="button" type="reset" style={{backgroundColor:'orange', color:'white'}} onClick={handleReset}>Reset</button>
                <div className="columns is-multiline" >
                  {data.allImageSharp.edges.map((it, index)=>
                    <div className="column is-4 columns is-multiline">
                        <div className="column is-full">
                          <Img fluid={it.node.fluid} backgroundColor={backgroundColor} style={{cursor:'pointer'}} />
                        </div>  
                          <div className="column is-full">
                            <label>File: 
                              {it.node.fluid.originalName}
                            </label>
                          </div>

                          <div className="column is-full">
                            <label>Name:
                            <input type="text" placeholder={'Ex: 2020-001'} name = {'name'} value = {value(it, 'name')} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>

                          <div className="column is-full">
                            <label>Price:
                            <input type="text" placeholder={'Ex: 100 SEK / 10 EUR / 12 USD'} name = {'price'} value = {value(it, 'price')} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>

                          <div className="column is-full">
                            <label>Size:
                              <input type="text" placeholder={'Ex: 100cm x 50cm'} name = {'size'} value = {value(it, 'size')} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>

                          <div className="column is-full">
                            <label>Show on homepage:
                              <input type="checkbox" placeholder={'Example: 100cm x 50cm'} name = {'showOnHomepage'} value = {value(it, 'showOnHomepage')} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>


                          <div className="column is-full">
                            <label>Hide this image:
                              <input type="checkbox" placeholder={'Example: 100cm x 50cm'} name = {'hidden'} value = {value(it, 'hidden')} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>

                          <div className="column is-full">
                            <label>Sequence number:
                              <input type="number" placeholder={0} style={{width:40}} name = {'sequenceNumber'} value = {value(it, 'sequenceNumber')} onChange={e => handleChange(e, index)} />
                            </label>
                          </div>

                          <div className="column is-full">
                            <textarea placeholder="Description of image ..." name="desc" value = {value(it,'desc')} style={{height:'170px'}} onChange={e => handleChange(e, index)}></textarea>
                          </div>
                      </div>
                    )}
                </div>
              </form>
              </div>
            )
          }}
        />
      )
}
  

