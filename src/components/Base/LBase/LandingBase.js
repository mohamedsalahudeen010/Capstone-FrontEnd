import React from 'react'
import LandingNavBar from './NavBar/LandingNavBar'


function LandingBase(props) {
  return (
    <div className='Base'>
        <LandingNavBar/>
        {props.children}
    </div>
  )
}

export default LandingBase