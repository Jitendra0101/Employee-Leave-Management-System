import React from 'react'
import { Link } from 'react-router-dom'
import layout from "../layout/Layout.css"
export default function Navbar() {
  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid" >
    <Link> <div className="navbar-brand" to="/home" >Full Stack Application</div>
    </Link>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    <div className='btns'>
    <Link> <button className="btn btn-outline-light " to='/addHR'>Add HR</button> 
      
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
