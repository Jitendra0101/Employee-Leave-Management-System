import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderComponent from './HeaderComponent';

const AddWorker = () => {
    const navigate = useNavigate();

    const [worker, setWorker] = useState({
        userName: "",
        email: "",
        designation: "",
        joiningDate: ""
    });

    const { userName, email, designation, joiningDate } = worker;

    const onInputChange = (e) => {
        setWorker({ ...worker, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:6900/api/workers", worker);
        window.history.back();
    }

    return (
        <div>

        
            <HeaderComponent/>
        <div className='container'>
            <div className="row">
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Add Worker</h2>

                    <form onSubmit={onSubmit}>

                        <div className='mb-3'>
                            <label htmlFor="userName" className='form-label'>Worker User Name: </label>
                            <input type="text" className='form-control' placeholder='Enter Worker User Name' name='userName' value={userName} onChange={onInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="email" className='form-label'>Email: </label>
                            <input type="email" className='form-control' placeholder='Enter Email address' name='email' value={email} onChange={onInputChange} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="designation" className='form-label'>Designation: </label>
                            <select className="form-control" name="designation" value={designation} onChange={onInputChange}>
                                <option value="">Select Designation</option>
                                <option value="HR">HR</option>
                                <option value="EMPLOYEE">EMPLOYEE</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="joiningDate" className='form-label'>Joining Date: </label>
                            <input type="date" className='form-control' name='joiningDate' value={joiningDate} onChange={onInputChange} />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' onClick={()=>window.history.go(-1)} to="#">Cancel</Link> 
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AddWorker;
