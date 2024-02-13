import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewWorker = () => {

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


    const loadWorker = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/api/workers/${id}`);
            setWorker(response.data);
        } catch (error) {
            console.error('Error fetching worker:', error);
        }
    }




    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'> Worker Details</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Details of Worker id:
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
                    <button className='btn btn-primary' onClick={() => window.history.back()}>Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default ViewWorker