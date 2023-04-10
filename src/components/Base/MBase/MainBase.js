import React from 'react'
import NavBar from './NavBar/NavBar'


function MainBase(props) {
  return (
    <div>
        <NavBar></NavBar>
        {props.children}
    </div>
  )
}

export default MainBase