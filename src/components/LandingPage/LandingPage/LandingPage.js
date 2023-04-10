import React, { useState } from "react";
import "./LandingPage.css";
import { useHistory } from "react-router-dom";

import LandingBase from "../../Base/LBase/LandingBase";

function LandingPage() {

  const history=useHistory()
  const getdate = new Date();
  const day = getdate.getDate() - 1;
  const month = getdate.getMonth() + 1;
  const year = getdate.getFullYear();
  const currentDate = `${year}-${month}-${day}`;

  const [currency, setCurrency] = useState("INR");
  const [date, setDate] = useState(currentDate);
  const [data, setData] = useState();
  const [content,setContent]=useState(false)
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
      if(rate.error==="No data available for this date or pair."){
        setContent(true)
      }else{
        setContent(false)
      }
      console.log(date);
      setData(rate);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LandingBase>
    <div className="landingPage">
     
      <div className="container">
        <span className="land-heading">Indian Gold Vault</span>
        <span className="land-heading1">We provides real-time precious metals data, including gold prices, in different currencies and units of measurement. we offers historical data Charts</span>


<div className="row form-div">
        <form onSubmit={(e) => getGoldRate(e, currency)} className="land-form">
          
    <div>
      <div><label htmlFor="currency" 
      className="land-scroll-label"> Select Currency</label></div>
        <select
         name="gold"
          value={currency}
            onChange={(e) => setCurrency(e.target.value)}
           id="currency"
           className="land-scroll-btn">
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
<div><label htmlFor="date"
className="land-date-label"> Select a Date</label></div>
<input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            className="land-date"
          ></input>
</div>



      <div>
      <button type="submit" className="land-btn">Calculate</button>
        </div>    
          
        </form>

        </div>
       {data && !content &&<div className="land-display">
            <h1>Gold Rate</h1>

             <h3 className="land-price"> 22k Gold Price : {data.price_gram_22k}  {data.currency} /-</h3>
            <p>To Get More Details SignUp Here </p>
            <button onClick={()=>{history.push("/signUp")}} className="btn">SignUp</button>
           
        </div>} 
        {content &&<div className="land-content-disp">
            <p>Data is Not available for Selected date, please change the date</p>
        </div>} 
      </div>
    </div>
    </LandingBase>
  );
  }

export default LandingPage;
