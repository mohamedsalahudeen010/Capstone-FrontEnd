import React from 'react'
import AdminNavBar from './NavBar/ANav'

function AdminBase(props) {
  return (
    <div className='admin-Base'>
        <AdminNavBar></AdminNavBar>
        {props.children}
    </div>
  )
}

export default AdminBase