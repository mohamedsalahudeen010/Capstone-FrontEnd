
import React, { useEffect } from 'react'
import { createContext } from 'react'

const gold=createContext()

function GoldContext({children}) {

  useEffect(()=>{
    
  },[])


  return (
    <gold.Provider value={{}}>
            {children}
    </gold.Provider>
    
  )
}

export default GoldContext