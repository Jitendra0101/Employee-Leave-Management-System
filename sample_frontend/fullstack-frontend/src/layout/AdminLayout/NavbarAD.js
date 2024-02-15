import React from 'react'
import { Link } from 'react-router-dom'
import layout from "./LayoutAD.css"
import '../../CSS/Login.css'
export default function Navbar() {
  return (
    <div>

<nav className="navbar navbar-expand-lg onlyGrad container-fluid ">
  <div className="container-fluid bg-dark onlyGrad " >
    <Link to="/home" > <div className="navbar-brand text-white" >Full Stack Application</div>
    </Link>
    <div className='btns'>
    <Link to='/addHR'> <button className="btn btn-outline-light ">Add HR</button> 
    </Link>
    <Link className="btn btn-outline-light" to='/adduser'>
      Add User
    </Link>
    </div>
  </div>
</nav>
    </div>
  )
}
