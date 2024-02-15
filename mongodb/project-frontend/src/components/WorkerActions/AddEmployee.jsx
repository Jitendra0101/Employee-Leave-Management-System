import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import emailjs from 'emailjs-com';
import HeaderComponent from '../HeaderComponent';

const AddEmployee = () => {

    const [worker, setWorker] = useState({
        userName: '',
        email: '',
        designation: '',
        password: '',
        joinDate: ''
    });

    const { userName, email, designation, password, joinDate } = worker;

    const onInputChange = (e) => {
        setWorker({ ...worker, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        // Send email using EmailJS
        const templateParams = {
            to_email: email,
            to_name: userName,
            to_password: password,
            to_designation: designation

        };

        await emailjs.send(
            'service_trg9i1h', // your service ID
            'template_p9e93j8', // your template ID
            templateParams,
            'WGiT9_FyZ_d4Aq3nn' // your user ID
        );

        // After sending email, proceed with saving data to backend
        await axios.post("http://localhost:6900/api/workers", worker);

        // Navigate back
        window.history.back();
    }

    return (
        <div>
            <HeaderComponent />
            <div className='container'>
                <div className="row">
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                        <h2 className='text-center m-4'>Add Employee</h2>

                        <form onSubmit={onSubmit}>

                            <div className='mb-3'>
                                <label htmlFor="userName" className='form-label'>User Name: </label>
                                <input type="text" className='form-control' placeholder='Enter User Name' name='userName' value={userName} onChange={onInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="password" className='form-label'>Password: </label>
                                <input type="text" className='form-control' placeholder='Enter Password' name='password' value={password} onChange={onInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email" className='form-label'>Email: </label>
                                <input type="email" className='form-control' placeholder='Enter Email address' name='email' value={email} onChange={onInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="designation" className='form-label'>Designation: </label>
                                <select className="form-control" name="designation" value={designation} onChange={onInputChange}>
                                    <option value="">Select Designation</option>
                                    <option value="EMPLOYEE">EMPLOYEE</option>
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="joinDate" className='form-label'>Joining Date: </label>
                                <input type="date" className='form-control' name='joinDate' value={joinDate} onChange={onInputChange} />
                            </div>
                            <button type='submit' className='btn btn-outline-primary'>Submit</button>
                            <Link className='btn btn-outline-danger mx-2' onClick={() => window.history.go(-1)} to="#">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;
