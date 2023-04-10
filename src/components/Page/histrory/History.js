import React, { useEffect, useState } from 'react'
import "./History.css"
import MainBase from '../../Base/MBase/MainBase.js';
import Accordion from 'react-bootstrap/Accordion';
import DeleteIcon from '@iconscout/react-unicons/icons/uil-trash-alt'
function History() {
    const [storedHistory,setStoredHistory]=useState();
    useEffect(()=>{
        const getHistory=async()=>{
            try {
                const response=await fetch("https://capstone-back-end-flame.vercel.app/history",{
                    method:"GET",
                    headers:{
                       "Content-Type":"application/json",
                       "x-auth-token":localStorage.getItem("token")
                    }
                })
                const history=await response.json()
                setStoredHistory(history.storedHistory)
                console.log(history)
            } catch (error) {
                console.log(error)
            }
        }
        getHistory()
    },[])

    const handleDelete=async(id)=>{
        try {
            const res=await fetch(`https://capstone-back-end-flame.vercel.app/history/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "x-auth-token":localStorage.getItem("token")
                 }
            })
            const data=await res.json();
            console.log(data)
            const deletedHistory=storedHistory.filter((his,idx)=>(his._id!==id))
            setStoredHistory(deletedHistory)


        } catch (error) {
            console.log(error)
        }
    }

  return (
    <MainBase>

   
    <div

    className='history'>

<span className="history-heading">Indian Gold Vault</span>
       <span className="history-heading1">We provides real-time precious metals data, including gold prices, in different currencies and units of measurement. we offers historical data Charts</span>
<div className='history-head3'>
    Searched History of Our Webpage
</div>
<div className='accordion'>
<Accordion defaultActiveKey="0">
            {storedHistory && storedHistory.map((his,index)=>(
                    <Accordion.Item eventKey={index} key={his._id}>
                    <Accordion.Header>
                        <div className='accordion-head'>
                        <span className='history-name'>Viewed by : {his.name}</span> 
                    <span className='history-date'>{his.date}</span>
                    <span className='history-delete-icon'>
                        <DeleteIcon onClick={()=>{handleDelete(his._id)}}
                    color="red" size="2rem"/></span>
                        </div>
                    
                    </Accordion.Header>
                  
                    <Accordion.Body>
                    <div>18K Gold Price :{his.price18k}</div>
                    <div>20K Gold Price :{his.price20k}</div>
                      <div>22K Gold Price :{his.price22k}</div>
                      <div>24K Gold Price :{his.price24k}</div>
                      <div>Stock Price :{his.stackPrice}</div>
                    </Accordion.Body>
                  </Accordion.Item>
            ))}
      
      </Accordion>
</div>
         
    </div>
    </MainBase>
  )
}

export default History