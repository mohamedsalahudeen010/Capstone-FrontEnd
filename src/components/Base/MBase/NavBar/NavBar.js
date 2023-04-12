import React from 'react'
import "./NavBar.css"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useHistory } from "react-router-dom";


function NavBar() {

   const handleLogOut=()=>{
      localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        history.push("/")
   }

const history=useHistory()
  return (
   

 <div className='nav-wrapper'>
        <div className='nav-left'>
            <div className='nav-name'
            onClick={()=>history.push("/main")}>
            Indian Gold Vault
            </div>
            <div className='nav-name1'
            >
            <span style={{ color:"silver"}}>Hello </span> 
            <span style={{ color:"gold"}}>{localStorage.getItem("name")} !</span> 
            </div> 
          
        </div>
        <div className='nav-right'>
                <div className='nav-list'>
                     <ul>
                       <li onClick={()=>{history.push("/main")}}>
                            Home
                        </li>
                        
                       <li onClick={()=>{history.push("/charts")}}>
                           Charts
                        </li>
                        <li onClick={()=>{history.push("/history")}}>
                           History
                        </li>
                        <li
                         onClick={()=>{history.push("/contact")}}>
                          Contact Us
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
              

            <Dropdown.Item eventKey="2"
            onClick={()=>{history.push("/charts")}}>Charts</Dropdown.Item>

            <Dropdown.Item eventKey="3" 
            onClick={()=>{history.push("/history")}}
            >History</Dropdown.Item>
          
           <Dropdown.Item eventKey="4" 
         onClick={()=>{history.push("/contact")}}
         >Contact Us</Dropdown.Item>
            <Dropdown.Divider />

            <Dropdown.Item eventKey="4" onClick={()=>handleLogOut()}
             >LogOut</Dropdown.Item>
            
          </DropdownButton>
    </div>
  
   
  )
}

export default NavBar
