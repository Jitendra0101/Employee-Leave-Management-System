import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MyDetails = () => {
    const [totalLeaves, setTotalLeaves] = useState(0);
    const [worker, setWorker] = useState({})

    const { id } = useParams();

    useEffect(() => {
        loadWorker()
    }, [])

    useEffect(() => {
        if (worker && worker.leaves) {
            setTotalLeaves(worker.leaves.length);
        }
    }, [worker]);

    const handleGoBack = () => {
        window.history.back();
    }

    const loadWorker = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/api/workers/${id}`);
            setWorker(response.data);
        } catch (error) {
            console.error('Error fetching worker:', error);
        }
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark" style={{ height: '80px', paddingLeft: '20px' }}>
                <div className="navbar-brand">Employee Leave Management</div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-primary" onClick={handleGoBack} style={{ marginRight: '30px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                    <strong>Go Back</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                        <h2 className='text-center m-4'> Worker Details</h2>
                        <div className='card'>
                            <div className='card-header'>
                                Details:
                                <ul className='list-group list-group-flush'>
                                    <li className='list-group-item'> <b>Name: </b>{worker.userName}</li>
                                    <li className='list-group-item'> <b>Email: </b>{worker.email}</li>
                                    <li className='list-group-item'> <b>Designation: </b>{worker.designation}</li>
                                    <li className='list-group-item'> <b>Joining Date: </b>{worker.joinDate}</li>
                                    <li className='list-group-item'> <b>sick leave balance: </b>{worker.sickLeaveBalance}</li>
                                    <li className='list-group-item'> <b>casual leave balance: </b>{worker.casualLeaveBalance}</li>
                                    <li className='list-group-item'> <b>privileged leave balance: </b>{worker.privilegeLeaveBalance}</li>
                                    <li className='list-group-item'> <b>Total leaves taken: </b>{totalLeaves}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyDetails