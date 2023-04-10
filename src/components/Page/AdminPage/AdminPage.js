import React, { useState } from 'react'
import "./AdminPage.css"

import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import AdminBase from '../../Base/ABase/AdminBase';

function AdminPage() {
  const history=useHistory()
  useEffect(()=>{
    let adminName=localStorage.getItem("name-admin");
    let adminEmail=localStorage.getItem("email-admin")

    if(!adminEmail && !adminName){
      history.replace("/adminLogIn")
    }
  },[])
  
  
  const getdate = new Date();
  const day = getdate.getDate();
  const month = getdate.getMonth()+1;
  const year = getdate.getFullYear();
  const currentDate = `${year}-${month}-${day}`;
  console.log("CurrentDate",currentDate)

  const [currency, setCurrency] = useState("INR");
  const [date, setDate] = useState(currentDate);
 

  const [data, setData] = useState();
  const [content,setContent]=useState(false)

  const[updateData,setUpdateData]=useState(false)
  const[updateDataFail,setUpdateDataFail]=useState(false)

  

  const setDataBackEnd=async()=>{
    try {
      const goldData={
            date:date,
            currency:data.currency,
            price_gram_24k:data.price_gram_24k,   
            price_gram_22k:data.price_gram_22k,   
            price_gram_21k:data.price_gram_21k,   
            price_gram_20k:data.price_gram_20k,   
            price_gram_18k:data.price_gram_18k,   
            stockPrice:data.price,
            time:data.timestamp,
            metalCode:data.metal,
            currencyCode:data.currency,
            prevPrice:data.prev_close_price,
            ch:data.ch,
            chp:data.chp,
            exchange:data.exchange

      }

      const response=await fetch("https://capstone-back-end-flame.vercel.app/goldData",{
          method:"POST",
          body:JSON.stringify(goldData),
          headers: {
            "Content-Type": "application/json",
            "x-auth-token":localStorage.getItem("token")
          },
      })
      const enteredData=await response.json()
      console.log(enteredData)
      if(enteredData.message==="data added Successfully"){
        setUpdateData(true)
        setUpdateDataFail(false)
      }
      else if(enteredData.message==="data Already exist"){
        setUpdateData(false)
        setUpdateDataFail(true)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const getGoldRate = async (e, currency,date) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://www.goldapi.io/api/XAU/${currency}/${date}`,
        {
          method: "GET",
          headers: {
            "x-access-token": "goldapi-303urlg3ccsth-io",
            "Content-Type": "application/json",
          },
        }
      );
      const rate = await response.json();
      setUpdateData(false)
        setUpdateDataFail(false)
      console.log(date);
      if(rate.error==="No data available for this date or pair."){
        setContent(true)
      }else{
        setContent(false)
        setData(rate);
      }
      
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };


  console.log("date",date)
  return (
    <AdminBase>
    <div>
      <div>
      <div className="adminPage">
     
     <div className="container">
       <span className="admin-heading">Indian Gold Vault</span>
       <span className="admin-heading1">We provides real-time precious metals data, including gold prices, in different currencies and units of measurement. we offers historical data Charts</span>

<div className="row form-div">
  <div className='col-md-6'>
  <form onSubmit={(e) => getGoldRate(e, currency,date)} className="admin-form">
         
         <div>
           <div><label htmlFor="currency"> Select Currency</label></div>
             <select
              name="gold"
               value={currency}
                 onChange={(e) => setCurrency(e.target.value)}
                id="currency">
                     <option value="INR">INR - Indian Rupee</option>
                     <option value="USD">USD - United States Dollar</option>
                     <option value="AUD">AUD - Australian Dollar</option>
                     <option value="GBP">GBP - British Pound</option>
                     <option value="EUR">EUR - European Euro</option>
                     <option value="CHF">CHF - Swiss Franc</option>
                     <option value="CAD">CAD - Canadian Dollar</option>
                     <option value="JPY">JPY - Japanese Yen</option>
                     <option value="KRW">KRW - South Korea Won</option>
                     <option value="CNY">CNY - Chinese/yuan Renminbi</option>
                     <option value="ZAR">ZAR - South African Rand</option>
                     <option value="THB">THB - Thai Bhat</option>
                     <option value="SAR">SAR - Saudhi Riyal</option>
                     <option value="OMR">OMR - Oman Riyal</option>
                     <option value="EGP">EGP - Egyptian Pound</option>
                     <option value="KWD">KWD - Kuwait Dinar</option>
                     <option value="AED">AED - U.A.E Dirham</option>
                     <option value="RUB">RUB - Russian Ruble</option>
                     <option value="SGD">SGD - Singapore Dollar</option>
                     <option value="CZK">CZK - Czech Krona</option>
                     <option value="HKD">HKD - Hong Kong Dollar</option>
                     <option value="PLN">PLN - Polish Zloty</option>
                     <option value="MYR">MYR - Malaysian Ringgit</option>
                     <option value="MXN">MXN - Mexican Peso</option>
                     <option value="XAG">XAG - Gold/Silver Ratio</option>
                     <option value="BTC">BTC - Bitcoin</option>
                 
             </select>
         </div>
      
      <div>
      <div><label htmlFor="date"> Select a Date</label></div>
      <input
                 type="date"
                 name="date"
                 value={date}
                 onChange={(e) => setDate(e.target.value)}
                 
                 id="date"
               ></input>
      </div>
      
      
      
           <div>
           <button type="submit" className="admin-btn"
           >Calculate</button>
             </div>    
               
             </form>   
  </div>
      
      {data && !content &&
      <div className='col-md-6 admin-display-head'>
      <div className="admin-display">
           <h1 className='admin-gold-rate'>Gold Rate</h1>

            <h6 className="admin-price">{data && `18k Gold Price : ${data.price_gram_18k}  ${data.currency} /-`} </h6>
           <h6 className="admin-price">{data && `20k Gold Price : ${data.price_gram_20k}  ${data.currency} /-`}</h6>
          <h6 className="admin-price">{data && `21k Gold Price : ${data.price_gram_21k}  ${data.currency} /-`}</h6> 
            <h6 className="admin-price"> 22k Gold Price : {data.price_gram_22k}  {data.currency} /-</h6>
              <h6 className="admin-price">{data && `24k Gold Price : ${data.price_gram_24k}  ${data.currency} /-`}</h6>

       </div>
       </div>} 
      
       </div>
       {content &&<div className="land-content-disp">
            <p>Data is Not available for Selected date, please change the date</p>
        </div>} 
       {data?<div><button className='admin-set-btn' 
       onClick={setDataBackEnd}>Set Rate</button></div>:""}
     
     </div>
     {updateData?<div>Data Updated Successfully</div>:""}
     {updateDataFail?<div> Data Already Exist</div>:""}
    
   </div>
      </div>
      <div className='adminpage-gold-chart'>
     <div style={{width: "100%", height: "578px",color:"gray"}}>
      <iframe src="https://gold-feed.com/charts/goldfeed29v9234ltlvl234l66l324/chart.php" scrolling="no" height="100%" width="100%" frameborder="0"></iframe>
      </div>
      </div>
    </div>
    </AdminBase>
  )
}

export default AdminPage
