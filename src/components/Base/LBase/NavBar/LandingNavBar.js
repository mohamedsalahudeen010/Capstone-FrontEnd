import React from 'react'
import "./LandingNavBar.css"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


import { useHistory } from 'react-router-dom';

function LandingNavBar() {

   const history=useHistory()
  return (
   
 <div className='nav-wrapper'>
        <div className='nav-left'>
            <div className='nav-name'
            onClick={()=>{history.push("/")}}>
              Indian Gold Vault
            </div>
            
            
        </div>
        <div className='nav-right'>
                <div className='nav-list'>
                     <ul>
                       <li onClick={()=>{history.push("/logIn")}}>
                           LogIn
                        </li>
                      
                      <li onClick={()=>{history.push("/signUp")}}>
                           SignUp
                        </li>
                        <li onClick={()=>{history.push("/adminLogIn")}}>
                      Admin LogIn
                        </li>
                        <li onClick={()=>{history.push("/adminSignUp")}}>
                           Admin SignUp
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
            
              <Dropdown.Item eventKey="1"  onClick={()=>{history.push("/logIn")}}>LogIn</Dropdown.Item>
             

           
            <Dropdown.Item eventKey="2" onClick={()=>{history.push("/signUp")}}>SignUp</Dropdown.Item>
           
            <Dropdown.Item eventKey="2" onClick={()=>{history.push("/AdminLogIn")}}>Admin Login</Dropdown.Item>
        
            <Dropdown.Item eventKey="2" onClick={()=>{history.push("/AdminSignUp")}}>Admin SignUp</Dropdown.Item>
        

          </DropdownButton>
    </div>
  
   
  )
}

export default LandingNavBar