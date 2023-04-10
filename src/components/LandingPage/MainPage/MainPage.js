import React, { useState } from 'react'
import "./MainPage.css"
import { useHistory } from 'react-router-dom';
import MainBase from '../../Base/MBase/MainBase';


function MainPage() {
  
  const history=useHistory()
  const getdate = new Date();
  const day = getdate.getDate() - 1;
  const month = getdate.getMonth() + 1;
  const year = getdate.getFullYear();
  const currentDate = `${year}-${month}-${day}`;
  console.log(currentDate)

  const [currency, setCurrency] = useState("INR");
  const [date, setDate] = useState(currentDate);
  const [data, setData] = useState();
  const [content,setContent]=useState(false)
  const [gram,setGram]=useState(1)
  const getGoldRate = async (e, currency) => {
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
      console.log(rate);
      console.log(date);
      if(rate.error==="No data available for this date or pair."){
        setContent(true)
      }else{
        setContent(false)
      }
      setData(rate);
      saveHistory()
    } catch (error) {
      console.log(error);
    }
  };

  const saveHistory=async()=>{
    try {
      const history={
            name:localStorage.getItem("name"),
            date:date,
            currency:data.currency,
            price_gram_24k:data.price_gram_24k,   
            price_gram_22k:data.price_gram_22k,   
            price_gram_21k:data.price_gram_21k,   
            price_gram_20k:data.price_gram_20k,   
            price_gram_18k:data.price_gram_18k,   
            price:data.price 
      }

      const response=await fetch("https://capstone-back-end-flame.vercel.app/history",{
          method:"POST",
          body:JSON.stringify(history),
          headers: {
            "Content-Type": "application/json",
            "x-auth-token":localStorage.getItem("token")
          },
      })
      const enteredHistory=await response.json()
      console.log(enteredHistory)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <MainBase>
    <div>
      
      <div>
      <div className="mainPage">
     
     <div className="container">
       <span className="main-heading">Indian Gold Vault</span>
       <span className="main-heading1">We provides real-time precious metals data, including gold prices, in different currencies and units of measurement. we offers historical data Charts</span>

<div className="row form-div">
  <div className='col-md-6'>
  <form onSubmit={(e) => getGoldRate(e, currency)} className="main-form">
         
         <div>
           <div><label htmlFor="currency"> Select Currency</label></div>
             <select
              name="gold"
               value={currency}
                 onChange={(e) => setCurrency(e.target.value)}
                id="currency"
                className='main-scroll-btn'>
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
                 className='main-date'
               ></input>

      <div><label htmlFor="gram">Enter Grams of Gold</label></div>
      <input type="number" name="gram"
      className='main-gram' value={gram}
      onChange={(e)=>setGram(e.target.value)}></input>
      </div>

      
      
      
      
           <div>
           <button type="submit" className="main-btn" 
           >Calculate</button>
             </div>    
               
             </form>   
  </div>
      
      {data && !content &&
      <div className='col-md-6 main-display-head'>
      <div className="main-display">
           <h1 className='main-gold-rate'>Gold Rate</h1>

            <h6 className="main-price">{data && `18k Gold Price : ${data.price_gram_18k *gram}  ${data.currency} for ${gram} grams`} </h6>
           <h6 className="main-price">{data && `20k Gold Price : ${data.price_gram_20k*gram}  ${data.currency} for ${gram} grams`}</h6>
          <h6 className="main-price">{data && `21k Gold Price : ${data.price_gram_21k*gram}  ${data.currency} for ${gram} grams`}</h6> 
            <h6 className="main-price">{data &&` 22k Gold Price : ${data.price_gram_22k*gram}  ${data.currency} for ${gram} grams`}</h6>
              <h6 className="main-price">{data && `24k Gold Price : ${data.price_gram_24k*gram}  ${data.currency} for ${gram} grams`}</h6>

       </div>
       </div>} 
       
      
       </div>
     
        {content &&<div className="land-content-disp">
            <p>Data is Not available for Selected date, please change the date</p>
        </div>} 
     </div>
   </div>
      </div>
      <div className='mainpage-gold-chart'>
     <div style={{width: "80%", height: "578px",color:"gray",marginLeft:"10%"}}>
      <iframe src="https://gold-feed.com/charts/goldfeed29v9234ltlvl234l66l324/chart.php" scrolling="no" height="100%" width="100%" frameborder="0"></iframe>
      </div>
      </div>
    </div>
    </MainBase>
  )
}

export default MainPage