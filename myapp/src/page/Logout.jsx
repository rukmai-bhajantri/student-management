import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Logout({ updaterole}) {
    let navigation= useNavigate()

    useEffect(()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("role")
         navigation('/')
    },[navigation,updaterole])
  return (
    <div>Logout</div>
  )
}

export default Logout