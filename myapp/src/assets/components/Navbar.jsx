import React from 'react'
import logo1 from '../img/stlogo.png'
import { Link } from 'react-router-dom'

function Navbar({ role }) {
  return (
    <nav className='navbar'>
      <div className='container'>

        <Link to='/' className='nav-label'>
          <img src={logo1} className='nav-img' alt="logo" />
        </Link>

        <ul className='nav-menu'>

          {!role ? (
            <>
              <li className='nav-items'>
                <Link to='/' className='nav-label'>Home</Link>
              </li>

              <li className='nav-items'>
                <Link to='/signup' className='nav-label'>SignUp</Link>
              </li>

              <li className='nav-items'>
                <Link to='/login' className='nav-label'>Login</Link>
              </li>

              <li className='nav-items'>
                <Link to='/admin' className='nav-label'>Admin</Link>
              </li>

              <li className='nav-items'>
                <Link to='/faculty' className='nav-label'>Faculty</Link>
              </li>
            </>
          ) : role === "admin" ? (
            <>
              <li className='nav-items'>
                <Link to='/student' className='nav-label'>Student</Link>
              </li>

              <li className='nav-items'>
                <Link to='/logout' className='nav-label'>Logout</Link>
              </li>
            </>
          ) : role === "faculaty" ? (
            <>
              <li className='nav-items'>
                <Link to='/facdashboard' className='nav-label'>
                  FacultyDashboard
                </Link>
              </li>

              <li className='nav-items'>
                <Link to='/logout' className='nav-label'>Logout</Link>
              </li>
            </>
          ) : role === "user" ? (
            <>
              <li className='nav-items'>
                <Link to='/profile' className='nav-label'>
                  StudentDashboard
                </Link>
              </li>

              <li className='nav-items'>
                <Link to='/logout' className='nav-label'>Logout</Link>
              </li>
            </>
          ) : null}

        </ul>

      </div>
    </nav>
  )
}

export default Navbar