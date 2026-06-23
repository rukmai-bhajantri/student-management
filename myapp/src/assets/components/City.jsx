import React, { useEffect, useState } from 'react'

function City({getSelectCityData}) {
let [city,setcity]=useState([])
let [formcity,setformcity]=useState([])
let [search,setSearch]=useState("")
let [cityFiltercity,SetFilterCity]=useState([])
   let getData=async()=>{
    let response=await fetch("http://localhost:5000/cityData")
    let result=await response.json()
    setcity(result)
   } 
   
   console.log(city)
   useEffect(()=>{
    getData()
   },[])

let cityselectHandler=(citys)=>{
setSearch(citys.cityname)
getSelectCityData(citys.cityid)
SetFilterCity([])
}

   let cityfilter=(e)=>{
    let val=e.target.value
    setSearch(val)
   SetFilterCity(val?city.filter(citys=>(citys.cityname.toLowerCase().startsWith(val.toLowerCase()))):[])
   }
   console.log(cityFiltercity)
  return (
   <>
    <input type="text" placeholder='Seacrc City..' value={search} onChange={cityfilter} className='date-control'></input>
    <div>
        {
            cityFiltercity.map(citys=><>
         <ul className='ul-style'>
            <li className='li-style' onClick={()=>cityselectHandler(citys)}>{citys.cityname}</li>
            </ul>   
            </>)
        }
    </div>
   </>
  )
}

export default City