import React, { useState } from "react";
import "./LandingPage.css";
import { useHistory } from "react-router-dom";

import LandingBase from "../../Base/LBase/LandingBase";

function LandingPage() {
  const history = useHistory();
  const getdate = new Date();
  const day = getdate.getDate() - 1;
  const month = getdate.getMonth() + 1;
  const year = getdate.getFullYear();
  const currentDate = `${year}-${month}-${day}`;

  // <<<<<<<<<<<<<<<<<<<<<<FORM 1>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [currency, setCurrency] = useState("INR");
  const [metal, setMetal] = useState("XAU");
  const [unit, setUnit] = useState("GRAM");
  const [data, setData] = useState();
  const [content, setContent] = useState(false);
  // <<<<<<<<<<<<<<<<<<<<<<FORM 2>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [metal1, setMetal1] = useState("XAU");
  const [date, setDate] = useState(currentDate);
  const [content1, setContent1] = useState(false);
  const [data1, setData1] = useState();
  // <<<<<<<<<<<<<<<<<<<<<<FORM 3>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [noOfCurrency, setNoOfCurrency] = useState(1);
  const [c1, setC1] = useState("INR");
  const [c2, setC2] = useState("USD");
  const [content2, setContent2] = useState(false);

  const [currencyRate, setCurrencyRate] = useState();

  // <<<<<<<<<<<<<<<<<<<<<<FORM 1>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const getGoldRate = async (e, currency, metal, unit) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://live-metal-prices.p.rapidapi.com/v1/latest/${metal}/${currency}/${unit}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "8b42184434msh71f1f83f04cdf81p17b83ejsnab3ce3b304b3",
            "X-RapidAPI-Host": "live-metal-prices.p.rapidapi.com",
            "Content-Type": "application/json",
          },
        }
      );
      const rate = await response.json();
      if (rate.message === "You have exceeded the MONTHLY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/solutionsbynotnull/api/live-metal-prices") {
        setContent(true);
      } else {
        setContent(false);
      }
      console.log(date);
      setData(rate);
    } catch (error) {
      console.log(error);
    }
  };
  // <<<<<<<<<<<<<<<<<<<<<<FORM 2>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const getGoldRateDate = async (e, metal1, date) => {
    e.preventDefault();
    console.log(date);
    try {
      const response = await fetch(
        // `https://www.goldapi.io/api/XAU/${currency}/${date}`,
        `https://www.goldapi.io/api/${metal1}/USD/${date}`,
        {
          method: "GET",
          headers: {
            "x-access-token": "goldapi-303urlg3ccsth-io",
            "Content-Type": "application/json",
          },
        }
      );
      const rate = await response.json();
      if (rate.error === "No data available for this date or pair.") {
        setContent1(true);
      } else {
        setContent1(false);
      }
     
      setData1(rate);
    } catch (error) {
      console.log(error);
    }
  };

  // <<<<<<<<<<<<<<<<<<<<<<FORM 3>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const currencyConverter = async (e, c1, c2) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.metalpriceapi.com/v1/latest?api_key=cc2d13ef52b459460b39fd1f90f7aae5&base=${c1}&currencies=${c2}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const currency = await response.json();
      if (currency.success === "false") {
        setContent2(true);
      } else {
        setContent2(false);
      }
      setCurrencyRate(currency.rates[c2]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LandingBase>
      <div className="landingPage">
        
          <span className="land-heading">Indian Gold Vault</span>
          <span className="land-heading1">
            We provides real-time precious metals data, including gold prices,
            in different currencies and units of measurement. we offers
            historical data Charts
          </span>
          {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<FORM 1 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <div className="row form-div">
            <form
              onSubmit={(e) => getGoldRate(e, currency, metal, unit)}
              className="land-form col-6"
            >
              <h3>Gold Rate Convertor</h3>
              <div>
                <div>
                  <label htmlFor="currency" className="land-scroll-label">
                    {" "}
                    Select Metal
                  </label>
                </div>
                <select
                  name="metal"
                  value={metal}
                  onChange={(e) => setMetal(e.target.value)}
                  id="metal"
                  className="land-scroll-btn"
                >
                  <option value="XAU">Gold 22 karat</option>
                  <option value="XAU_18K">Gold 18 karat</option>
                  <option value="XAU_14K">Gold 14 karat</option>
                  <option value="XAG">Silver</option>
                  <option value="PL">Palladium</option>
                  <option value="PA">Protactinium</option>
                </select>
              </div>

              <div>
                <div>
                  <label htmlFor="currency" className="land-scroll-label">
                    {" "}
                    Select Currency
                  </label>
                </div>
                <select
                  name="gold"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  id="currency"
                  className="land-scroll-btn"
                >
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
                <div>
                  <label htmlFor="unit" className="land-scroll-label">
                    {" "}
                    Select Unit of Weight
                  </label>
                </div>
                <select
                  name="unit"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  id="unit"
                  className="land-scroll-btn"
                >
                  <option value="GRAM">Gram</option>
                  <option value="ounce">Ounce</option>
                </select>
              </div>

              <div>
                <button type="submit" className="land-btn">
                  Calculate
                </button>
              </div>
            </form>
          
           {data && !content && (
            <div className="land-display col-6">
              <h1>Gold Rate</h1>

              <h3 className="land-price ">
                {" "}
                {metal} prize : {data.rates[metal]} {currency} /-
              </h3>
              <p>To Get More Details SignUp Here </p>
              <button
                onClick={() => {
                  history.push("/signUp");
                }}
                className="btn"
              >
                SignUp
              </button>
            </div>
           )}
           {content && (
            <div className="land-content-disp">
              <p>
                You have Exceeded the monthly limit for Requests on your current plan
              </p>
            </div>
           )}
            </div>
         

        {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<FORM 2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <div className="row form-div">
          <form
            onSubmit={(e) => getGoldRateDate(e, metal1, date)}
            className="land-form col-6"
          >
            <div>
              <div>
                <div>
                  <label htmlFor="currency" className="land-scroll-label">
                    {" "}
                    Select Metal
                  </label>
                </div>
                <select
                  name="metal"
                  value={metal1}
                  onChange={(e) => setMetal1(e.target.value)}
                  id="metal"
                  className="land-scroll-btn"
                >
                  <option value="XAU">Gold</option>
                  <option value="XAG">Silver</option>
                </select>
              </div>

              <div>
                <label htmlFor="date" className="land-date-label">
                  {" "}
                  Select a Date
                </label>
              </div>
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
              <button type="submit" className="land-btn">
                Calculate
              </button>
            </div>
          </form>
       
        {data1 && !content1 && (
          <div className="land-display col">
            <h1>Gold Rate</h1>

            
            <h6 className="main-price">{data1 && data1.metal==="XAU"?`Gold Price : ${data1.price_gram_22k }  ${data1.currency} for 1 gram Gold`:
              `Silver Price : ${data1.price_gram_22k }  ${data1.currency} for 1 gram Silver`}  </h6>
            <p>To Get More Details SignUp Here </p>
            <button
              onClick={() => {
                history.push("/signUp");
              }}
              className="btn"
            >
              SignUp
            </button>
          </div>
        )}
        {content1 && (
          <div className="land-content-disp">
            <p>
              Data is Not available for Selected date, please change the date
            </p>
          </div>
        )}
       </div>
        {/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<FORM 3 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        <div className="row form-div">
          <form
            onSubmit={(e) => currencyConverter(e, c1, c2)}
            className="land-form col-6"
          >
            <h3>Currency Convertor</h3>
            <div>
              <div>
                <label htmlFor="currency" className="land-scroll-label">
                  {" "}
                  Select Currency 1
                </label>
              </div>
              <select
                name="gold"
                value={c1}
                onChange={(e) => setC1(e.target.value)}
                id="currency"
                className="land-scroll-btn"
              >
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
              <label htmlFor="currency" className="land-scroll-label">
                {" "}
                Select Number Of Currency :
              </label>
              {"  "}
              <input
                type="number"
                name="currencyNumber"
                value={noOfCurrency}
                onChange={(e) => setNoOfCurrency(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="currency" className="land-scroll-label">
                {" "}
                Select Currency 2
              </label>
            </div>
            <select
              name="gold"
              value={c2}
              onChange={(e) => setC2(e.target.value)}
              id="currency"
              className="land-scroll-btn"
            >
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

            <div>
              <button type="submit" className="land-btn">
                Calculate
              </button>
            </div>
          </form>
       
        {currencyRate && !content2 && (
          <div className="land-display col">
            <h1>Currency Convertor</h1>

            <h3 className="land-price">
              {noOfCurrency} {c1} : {noOfCurrency * +currencyRate} {c2}
            </h3>
            <p>To Get More Details SignUp Here </p>
            <button
              onClick={() => {
                history.push("/signUp");
              }}
              className="btn"
            >
              SignUp
            </button>
          </div>
        )}
        {content2 && (
          <div className="land-content-disp">
            <p>
              Data is Not available for Selected Currency, please change the
              Currency
            </p>
          </div>
        )}
         </div>
      </div>
    </LandingBase>
  );
}

export default LandingPage;
