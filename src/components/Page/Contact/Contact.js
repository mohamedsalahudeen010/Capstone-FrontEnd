import React, { useState } from 'react'
import "./Contact.css"
import  { useRef } from 'react';
import emailjs from '@emailjs/browser';
import MainBase from '../../Base/MBase/MainBase';

function Contact() {
  const form = useRef();
  const[done,setDone]=useState(false)
  const [enterMessage,setEnterMessage]=useState(false)
  const [enterName,setEnterName]=useState(false)
  const [enterEmail,setEnterEmail]=useState(false)

  const[nameAlert,setNameAlert]=useState()
  const[emailAlert,setEmailAlert]=useState()
  const[messageAlert,setMessageAlert]=useState()

  const sendEmail = (e) => {
    e.preventDefault();
    setDone(false)
    setNameAlert(false)
    setEmailAlert(false)
    setMessageAlert(false)
  
    if(enterMessage  && enterName && enterEmail ){
      emailjs.sendForm('service_ty6zvur', 'template_b36sqbh', form.current, 'eWwj7nWu_c0lUDMH8')
      .then((result) => {
          console.log(result.text);
          setDone(true)
          
      }, (error) => {
          console.log(error.text);
      });
    }
    else if(!enterName){
      setNameAlert(true)
     
    }
    else if(!enterEmail){
      setEmailAlert(true)
     
    }
    else if(!enterMessage){
      
      setMessageAlert(true)
      
    }
    
  };
  return (
    <MainBase>
    <div className='contact' id='contacts'>
      <span className="main-heading">Indian Gold Vault</span>
       <span className="main-heading1">We provides real-time precious metals data, including gold prices, in different currencies and units of measurement. we offers historical data Charts</span>

        <div className='row'>
            <div className='col-md-6 contact-left'>
                <span>Indian Gold Vault</span>
                <span>Contact us</span>
            </div>
            <div className='col-md-6 contact-right'>
              <form ref={form} onSubmit={sendEmail}>
            
            <div>
            <input className='contact-name' type="text" 
            name="user_name" placeholder='Enter Your Name' 
            onChange={(e)=>setEnterName(e.target.value)}></input>
            </div>
            <div>
              <input type="email" name="user_email" 
              className='contact-email' placeholder='Enter Your Email'
              onChange={(e)=>setEnterEmail(e.target.value)}></input>
              </div>              
              <div>
              <textarea name="message" rows="4" cols="30" 
              className='contact-textbox' placeholder='Enter Message' 
              onChange={(e)=>setEnterMessage(e.target.value)}
              ></textarea>
              </div>
              <div>
              <button className='btn contact-btn' type='submit'>Send</button>
              </div>
              <div className='contact-alert-main'>
              {done?<span className='contact-success'>Thank you for Contacting Us</span>:""}
              {nameAlert?<span className='contact-alert'>Please Enter a Name</span>:""}
              {emailAlert?<span className='contact-alert'>Please Enter a Mail</span>:""}
              {messageAlert?<span className='contact-alert'>Please Enter a Message</span>:""}
              </div>
              </form>
            </div>
             
              

        </div>
    </div>
    </MainBase>
  )
}

export default Contact