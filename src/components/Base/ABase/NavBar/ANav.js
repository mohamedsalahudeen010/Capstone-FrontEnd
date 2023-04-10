import React from 'react'
import "./NavBar.css"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useHistory } from "react-router-dom";


function AdminNavBar() {

   const handleLogOut=()=>{
      localStorage.removeItem("email-admin");
        localStorage.removeItem("name-admin");
        localStorage.removeItem("token-admin");
        history.push("/")
   }

const history=useHistory()
  return (
   

 <div className='nav-wrapper'>
        <div className='nav-left'>
            <div className='nav-name'
            onClick={()=>history.push("/admin")}>
            Indian Gold Vault
            </div>
            <div className='nav-name'
            >
            <span style={{fontSize:"1.5rem", color:"silver"}}>Hello </span> 
            <span style={{fontSize:"1.2rem", color:"gold"}}>{localStorage.getItem("name-admin")} !</span> 
            </div> 
          
        </div>
        <div className='nav-right'>
                <div className='nav-list'>
                     <ul>
                       <li onClick={()=>{history.push("/admin")}}>
                            Home
                        </li>
                        
                       <li>
                           Charts
                        </li>
                        
                      
                        <li onClick={()=>handleLogOut()}>
                           LogOut
                        </li>
                       
                     </ul>
                     
                </div>
         
                  
                     
        </div>
        <DropdownButton
         className='dropDown'
            as={ButtonGroup}
            title={"..."}
            id={`dropdown-variants-warning`}
            
          >
            <Dropdown.Item eventKey="1" active
            onClick={()=>{history.push("/main")}}
            >Home</Dropdown.Item>
              

            <Dropdown.Item eventKey="2">Charts</Dropdown.Item>
            
            <Dropdown.Item eventKey="4" onClick={()=>handleLogOut()}
             >LogOut</Dropdown.Item>
            
          </DropdownButton>
    </div>
  
   
  )
}

export default AdminNavBar