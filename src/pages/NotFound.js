import React from 'react'
import {Link} from 'react-router-dom'
import notfound from '../components/img/notfound.png'


function NotFound() {
    return (
        <div>
           <img src={notfound}  />
             <p style={{textAlign:"center"}}>
            <Link to="/">Go to Home</Link>
            </p>
        </div>
    )
}

export default NotFound