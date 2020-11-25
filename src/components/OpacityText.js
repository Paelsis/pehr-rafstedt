import React from "react"

export default ({title, text}) =>
<div style={{textAlign:'left'}}>
    <span style={{fontFamily:'broadcastmatter', fontSize:'2.2em', color:'hsla(43, 36%, 90%, 1)'}}>  {title?title:'MY VISION'}</span>
    <div style={{}}>
        <span style={{fontFamily:'avayx', fontSize:'1em', color:'hsla(43, 36%, 90%, 1)'}}>{text?text:'TO COMBINE COLOR WITH FANTASY TO CONTRIBUTE A BETTER HEALTH AND FUTURE FOR OUR LIVING PLANET'}</span>
    </div>
</div>