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

    const [showPassword, setShowPassword] = useState(false);

    const { userName, email, designation, password, joinDate } = worker;

    const onInputChange = (e) => {
        setWorker({ ...worker, [e.target.name]: e.target.value });
    }

    const isPasswordValid = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <HeaderComponent />
            <div className='section' style={{ minHeight: 'calc(100vh - 0px)', marginTop: '20px' }}>
                <div className="row">
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow' style={{ backgroundColor: 'rgb(33, 37, 41)' }}>
                        <h2 className='text-center m-4' style={{ color: 'white' }}>Add Employee</h2>

                        <form onSubmit={onSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="userName" className='form-label' style={{ color: 'white' }}>User Name: </label>
                                <input type="text" className='form-control' placeholder='Enter User Name' name='userName' value={userName} onChange={onInputChange} />
                            </div>
                            <div className='mb-1'>
                                <label htmlFor="password" className='form-label' style={{ color: 'white' }}>Password: </label>
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className='form-control' placeholder='Enter Password' name='password' value={password} onChange={onInputChange} />
                                    <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {!isPasswordValid(password) && <small className="text-danger">Password must contain at least 8 characters, including at least one number, one lowercase letter, and one uppercase letter.</small>}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email" className='form-label' style={{ color: 'white' }}>Email: </label>
                                <input type="email" className='form-control' placeholder='Enter Email address' name='email' value={email} onChange={onInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="designation" className='form-label' style={{ color: 'white' }}>Designation: </label>
                                <select className="form-control" name="designation" value={designation} onChange={onInputChange}>
                                    <option value="">Select Designation</option>
                                    <option value="EMPLOYEE">EMPLOYEE</option>
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="joinDate" className='form-label' style={{ color: 'white' }}>Joining Date: </label>
                                <input type="date" className='form-control' name='joinDate' value={joinDate} onChange={onInputChange} />
                            </div>
                            <button type='submit' className='btn btn-secondary'>Submit</button>
                            <Link className='btn btn-danger mx-2' onClick={() => window.history.go(-1)} to="#">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;
