import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import HeaderComponent from '../HeaderComponent';

const EditWorker = () => {

    const { id } = useParams()

    const [worker, setWorker] = useState({

        userName: '',
        email: '',
        designation: '',
        joinDate: ''

    });

    const { userName, email, designation, joinDate } = worker

    const onInputChange = (e) => {
        setWorker({ ...worker, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        loadWorker()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:6900/api/workers/${id}`, worker);
        window.history.back();
    }

    const loadWorker = async () => {
        const result = await axios.get(`http://localhost:6900/api/workers/${id}`);
        setWorker(result.data)
    }

    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <div className='container'>
                <div className="row">
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                        <h2 className='text-center m-4'>Edit Worker</h2>

                        <form onSubmit={(e) => onSubmit(e)}>


                            <div className='mb-3'>
                                <label htmlFor="userName" className='form-label'>User Name: </label>
                                <input type={"text"} className='form-control' placeholder='Enter User Name' name='userName' value={userName}
                                    onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email" className='form-label'>Email: </label>
                                <input type={"text"} className='form-control' placeholder='Enter Email' name='email' value={email}
                                    onChange={(e) => onInputChange(e)} />
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
                                <label htmlFor="joinDate" className='form-label'>Joining Date: </label>
                                <input type={"date"} className='form-control' placeholder='Select Joining Date' name='joinDate' value={joinDate}
                                    onChange={(e) => onInputChange(e)} />
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

export default EditWorker