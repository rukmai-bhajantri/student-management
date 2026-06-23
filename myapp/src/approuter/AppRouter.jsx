import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '../assets/components/Navbar'
import SignUp from '../page/SignUp'
import City from '../assets/components/City'
import Home from '../page/Home'
import Student from '../page/Student'
import Admin from '../page/Admin'
import Faculty from '../page/Faculty'
import Login from '../page/Login'
import Myprofile from '../page/Myprofile'
import FaculatyDashboard from '../page/FaculatyDashboard'
import Studentmarks from '../page/Studentmarks'
import Logout from '../page/Logout'
function AppRouter() {

  let [role, setRole]=useState(localStorage.getItem('role'))
  const updaterole=(role)=>{
    setRole(role)
    if(role){
      localStorage.getItem('role',role)
    }
    else{
      localStorage.removeItem('role')
    }
  }
  console.log("role",role)
  return (
    <>
    <Router>
        <Navbar role={role}/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
            <Route path='signup' element={<SignUp/>}></Route>
              <Route path='student' element={<Student/>}></Route>
              <Route path='admin' element={<Admin updaterole={updaterole}/>}></Route>
              <Route path='faculty' element={<Faculty updaterole={updaterole}/>}></Route>
              <Route path='login' element={<Login updaterole={updaterole}/>}></Route>
              <Route path='profile' element={<Myprofile/>}></Route>
              <Route path='facdashboard' element={<FaculatyDashboard/>}></Route>
              <Route path='marks' element={<Studentmarks/>}></Route>
               <Route path='logout' element={<Logout  updaterole={ updaterole}/>}></Route>
        </Routes>
    </Router>
    
    </>
  )
}

export default AppRouter