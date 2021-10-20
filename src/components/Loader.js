import React from 'react'
import loader from '../res/loader.svg'

const Loader = () => {
    return (
        <div style={{zIndex:1,backgroundColor:'rgba(255,255,255,0.1)'}}>
            <img src={loader} alt="" />
        </div>
    )
}

export default Loader
