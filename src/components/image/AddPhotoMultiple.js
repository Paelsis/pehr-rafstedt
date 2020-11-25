import React, {Component} from 'react'
import axios from 'axios'
import Tooltip from '@material-ui/core/Tooltip';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';
import JSONPretty from 'react-json-pretty';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const butColor ='#AAA' 

const styles={
  button:{color:butColor, width:45, height:45, padding:0, border:0},
  preview: {
    padding:1, 
    border:2, 
    borderStyle: 'dotted',
    borderColor:'red'
  }
}

const PrettyPrintJson = ({data}) => {
  // (destructured) data could be a prop for example
  var JSONPrettyMon = require('react-json-pretty/dist/monikai');
  return (
    <JSONPretty data={data} theme={JSONPrettyMon}></JSONPretty>
  )
}



class AddPhotoMultiple extends Component {
    constructor(props) {
      super(props);
      this.state = {
        buttonColor:butColor,
        selectedFiles:[],
        json:undefined
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSubmitJson = this.handleSubmitJson.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();
      console.log('files', this.state.selectedFiles)

      if (this.state.selectedFiles.length > 0) {
        const formData = new FormData()
        formData.append('rootdir', this.props.rootdir)
        if (this.props.subdir) {
          formData.append('subdir', this.props.subdir)
        }
        for (var key in this.state.selectedFiles) {
          const obj = this.state.selectedFiles[key];
          formData.append('newfile_arr[]', obj.file, obj.newFileName)
        } 
        console.log('formData', formData)
        this.setState({buttonColor:'yellow'})
        axios.post(apiBaseUrl + '/postImages', formData,
            {
                onUploadProgress: progressEvent => {console.log(progressEvent.loaded / progressEvent.total)}
            }
        ).then(response => {
            console.log('Status code:', response.status);
            console.log('Status data:', response.data);
            this.state.newFileNames.forEach(it => {
              this.props.addImage(it)
            }) 
            this.setState({selectedFiles:[], buttonColor:butColor})
        }).catch(error => {
            console.log('ERROR: Failed to upload:', error);
            this.setState({selectedFiles:[], buttonColor:'red'})
        });
      }
    }

    handleSubmitJson(event) {
      event.preventDefault();
      console.log('files', this.state.selectedFiles)
      if (this.state.selectedFiles.length > 0) {
        const obj = this.state.selectedFiles.map(it=>({newFileName:it.newFileName, caption:it.caption}));
        const json = JSON.stringify(obj, null, "\t")
        this.setState({json:obj})
      }
    }


    handleChange(e) {
      e.preventDefault();
      const files = e.target.files
      for(let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
            let selectedFile = {
              file: files[i],
              previewUrl: reader.result,
              newFileName:files[i].name 
            }
            this.setState({selectedFiles: [...this.state.selectedFiles, selectedFile]});
        }
        reader.readAsDataURL(files[i])
      }  
    }

    handleKeyChange (e, ix) {
      // 1. Make a shallow copy of the items
      this.setState({
        selectedFiles: [...this.state.selectedFiles.slice(0,ix), {...this.state.selectedFiles[ix], [e.target.name]:e.target.value}, ...this.state.selectedFiles.slice(ix+1)]
      })
    }



    renderForm() {    
      return(
        <form className={'columns is-narrow'} onSubmit={e=>this.handleSubmitJson(e)}>
            <button 
              className='column is-narrow' 
              type="submit" 
              style={{background:'transparent', border:'none'}} 
            >
              <SaveAltIcon display='none' style={{...styles.button, color:this.state.buttonColor}} />
            </button>
            <button  
              className='column is-narrow'
              style={{background:'transparent', border:'none'}}
              onClick={()=>this.setState({selectedFiles: [], buttonColor:butColor})}
            >
              <CancelIcon style={{...styles.button, color:this.state.buttonColor}} />                              
            </button>
        </form>
      )
  }

  render() {
    let {selectedFiles} = this.state;
    return (
      
        selectedFiles.length > 0?
           <div className={'columns is-multiline'}>
              {selectedFiles.map((it, ix)=>
                <div className='column is-half'>            
                  <img src={it.previewUrl} style={{padding:0, border:'2px dotted yellow'}}/>
                  <input 
                    type='text' 
                    style={{marginTop:0, paddingTop:0, height:20, fontSize:'x-small'}}
                    name={'newFileName'}
                    value={it.newFileName} 
                    onChange={(e)=>this.handleKeyChange(e, ix)}
                  />
                  <textarea 
                    name="caption" 
                    value={it.caption} 
                    rows="4" 
                    cols="50" 
                    onChange={(e)=>this.handleKeyChange(e, ix)}
                  />
                </div>
              )} 
              {this.renderForm()}
              <PrettyPrintJson data={this.state.json} />
            </div>  
        :
          <div>
            <input 
              type="file" 
              name="newfile"
              accept="image/*" 
              onChange={this.handleChange} 
              style={{display:'none'}}
              ref={fileInput => this.fileInput = fileInput} 
              multiple
            />
            <Tooltip title={'Add one or multiple photos from library (max 8 images per upload)'}>
              <AddAPhotoIcon style={{...this.props.style?this.props.style:styles.button, color:this.state.buttonColor}} onClick={()=>this.fileInput.click()} />
            </Tooltip>  
          </div>
    )
  }
}


  
export default AddPhotoMultiple
  