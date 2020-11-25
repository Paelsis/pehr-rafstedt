import axios from 'axios'

const API_BASE_URL='https://www.tangokompaniet.com/app/slim/public'
const apiBaseUrl = process?process.env?process.env.GATSBY_API_BASE_URL?process.env.GATSBY_API_BASE_URL:API_BASE_URL:API_BASE_URL:API_BASE_URL

const fullPath = (url) => apiBaseUrl + url

export function axiosPost(url, payload, handleReply) {

    console.log('---- postPayload ---', payload)

    //axios.post(url, payload, {auth:{username,password}})
    axios.post(fullPath(url), payload)
    .then((response) => {
        console.log('--- postPayload, url:---', fullPath(url));
        if (response.status === 200) {
            console.log('postPayload response:', response);
            handleReply(response.data);
        } else {    
            console.log('WARNING: post failed and returned with status code:', response.status?response.status:'undef');
            handleReply(null)
        }    
    })
    .catch((e) => {
        console.log('ERROR: Failed to post URL:' + fullPath(url));
        console.log('Error object:', e); // Error
        handleReply(null);
    });
}

export function axiosGet(url, handleReply) {
    axios({	
        method: 'get',
        url: fullPath(url), 
    })
    .then(
        response => {
            console.log('OK: axiosGet response.data:', response.data?response.data:'no data');
            handleReply(response.data);
    })  
    .catch(e => {
            console.log('(Function: axiosGet) ERROR:', e?e:'No event e');
            handleReply(null)
    })
}


