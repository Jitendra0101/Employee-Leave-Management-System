import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import NavbarAD from '../layout/AdminLayout/NavbarAD'


export default function AddUser() {
  
  let navigate = useNavigate()

  const [user, setUser] = useState({
    
    userName:"",
    email:"", 
    password: "",
    designation: "",
    joinDate: ""
  })

  
  const onInputChange=(event)=>{
    console.log("=>>>",event.target.name , event.target.value)
    // const{userName,value}=event.target;


    setUser({...user,[event.target.name]: event.target.value})  //spread operator keeps on adding new objects
  }

  const onSubmit= async(e)=>{
    e.preventDefault();

    console.log(await axios.post("http://localhost:6900/api/workers/addWorker", user))
    // navigate("/home")
  }


  return (
    <><NavbarAD />
    <div className='container'>
      
      <div id="conts" className="container d-flex justify-content-center align-items-center" style={{height:'80vh'}}>
        <div className='col-md-6  border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Register User</h2>  

          <form onSubmit={console.log(user)}>

          
          <div className='mb-3'>
            <label htmlFor="userName" className='form-label'>UserName: </label>
            <input type={"text"} className='form-control' placeholder='Enter Username' name ='userName'
            onChange={onInputChange}/>
          </div>
          <div className='mb-3'>
            <label htmlFor="password" className='form-label'>Password</label>
            <input type={"text"} className='form-control' placeholder='Enter Password' name ='password'
            onChange={onInputChange}/>
          </div>
          
          <div className='mb-3'>
            <label htmlFor="Email" className='form-label'>E-mail: </label>
            <input type={"text"} className='form-control' placeholder='Enter Email address' name ='email' 
            onChange={onInputChange}/>
          </div>

          <div className='mb-3'>
            <label htmlFor="joinDate" className='form-label'>join Date </label>
            <input type={"date"} className='form-control' placeholder='Enter Joining Date' name ='joinDate'
            onChange={onInputChange}/>
          </div>

          <div className='mb-3'>
            <label htmlFor="designation" className='form-label'>designation</label>
            <select type={"date"} className='form-control' placeholder='Enter Joining Date' name ='designation'

             onChange={onInputChange}> 
            <option value="">Select an option</option>
        <option value="ADMIN">ADMIN</option>
        <option value="HR">HR</option>
        <option value="EMPLOYEE">EMPLOYEE</option>
            </select>
          </div>
          
          <button type='submit' className='btn btn-outline-primary' onClick={onSubmit}>Submit</button>
          <Link className='btn btn-outline-danger mx-2' to ="/home">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
