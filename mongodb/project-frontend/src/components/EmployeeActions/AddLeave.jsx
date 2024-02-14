import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import HeaderComponent from '../HeaderComponent';

const AddLeave = () => {

    const { id } = useParams();

    const [leave, setLeave] = useState({
        startDate: '',
        endDate: '',
        leaveType: '',
        reason: '',
    });

    const { startDate, endDate, leaveType, reason } = leave;

    const onInputChange = (e) => {
        setLeave({ ...leave, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:6900/${id}/leaves/apply`, leave);
        window.history.back();
    }

    return (
        <div>
            <HeaderComponent />
            <div className='container'>
                <div className="row">
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                        <h2 className='text-center m-4'>Add Leave</h2>

                        <form onSubmit={onSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="startDate" className='form-label'>Start Date: </label>
                                <input type="date" className='form-control' name='startDate' value={startDate} onChange={onInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="endDate" className='form-label'>End Date: </label>
                                <input type="date" className='form-control' name='endDate' value={endDate} onChange={onInputChange} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="leaveType" className='form-label'>Leave Type: </label>
                                <select className="form-control" name="leaveType" value={leaveType} onChange={onInputChange}>
                                    <option value="">Select Leave Type</option>
                                    <option value="SICK_LEAVE">Sick Leave</option>
                                    <option value="CASUAL_LEAVE">Casual Leave</option>
                                    <option value="PRIVILEGE_LEAVE">Privilege Leave</option>
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="reason" className='form-label'>Reason: </label>
                                <textarea className='form-control' rows='3' name='reason' value={reason} onChange={onInputChange}></textarea>
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

export default AddLeave;
