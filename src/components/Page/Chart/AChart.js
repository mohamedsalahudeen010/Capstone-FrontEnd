import React, { useEffect, useState } from 'react'
import "./Chart.css"
import MainBase from '../../Base/MBase/MainBase'
import {Line} from "react-chartjs-2"

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from "chart.js"
import AdminBase from '../../Base/ABase/AdminBase'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)
function AdminChart() {
    const [mainData,setMainData]=useState()

    useEffect(()=>{
        const getSortedData=async()=>{
            try {
                const response=await fetch("https://capstone-back-end-flame.vercel.app/goldData",{
                    method:"GET",
                    headers:{
                       "Content-Type":"application/json",
                       "x-auth-token":localStorage.getItem("token")
                    }
                })
                const data1=await response.json()
                setMainData(data1.sortedData)
                console.log(data1)
            } catch (error) {
                console.log(error)
            }
        }

        getSortedData()
    },[])

   const lab=mainData&&mainData.map((data)=>data.date)
   const price=mainData&&mainData.map((data)=>data.price22k)
   const stockPrice=mainData&&mainData.map((data)=>data.price22k)

   const data={
    labels:lab,
    datasets:[{
        label:"Gold Rate History",
        data:price,
        backgroundColor:"aqua",
        borderColor:"gold",
        pointBorderColor:"aqua",
        fill:true,
        tension:0.5
    }]

    
   }

   const options={
    plugins:{
        Legend:true
    }
}

const datas={
    labels:lab,
    datasets:[{
        label:"Gold Stock Rate History",
        data:stockPrice,
        backgroundColor:"aqua",
        borderColor:"gold",
        pointBorderColor:"aqua",
        fill:true,
        tension:0.5
    }]

}
  return (
    <AdminBase>
    <div className='chart'>
    <span className="chart-heading">Indian Gold Vault</span>
    <div className='chart-gold-chart'>
     <div style={{width: "100%", height: "578px",color:"gray"}}>
      <iframe src="https://gold-feed.com/charts/goldfeed29v9234ltlvl234l66l324/chart.php" scrolling="no" height="100%" width="100%" frameborder="0"></iframe>
      </div>
      </div>
     <div className='row price-chart'>
        <div className='col-md-6'>
        <span>Gold Rate Trend History</span>
    <Line
    data={data}
    options={options}/>
    </div>

    <div className='col-md-6'>
        <span>Gold Stock Rate Trend History</span>
    <Line
    data={datas}
    options={options}/>
    </div>
     </div>
    </div>
    </AdminBase>
  )
}

export default AdminChart