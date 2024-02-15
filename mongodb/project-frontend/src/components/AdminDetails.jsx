import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdminDetails = () => {

    const [admin, setAdmin] = useState({})
    const { adminid } = useParams();

    useEffect(() => {
        loadAdmin()
    }, [])

    const loadAdmin = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/api/workers/${adminid}`);
            setAdmin(response.data);
        } catch (error) {
            console.error('Error fetching worker:', error);
        }
    }

    const handleGoBack = () => {
        window.history.back();
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
                        <h2 className='text-center m-4'>Profile Details</h2>
                        <div className='card'>
                            <div className='card-header'>
                                Details:
                                <ul className='list-group list-group-flush'>
                                    <li className='list-group-item'> <b>Name: </b>{admin.userName}</li>
                                    <li className='list-group-item'> <b>Password: </b>{admin.password}</li>
                                    <li className='list-group-item'> <b>Email: </b>{admin.email}</li>
                                    <li className='list-group-item'> <b>Designation: </b>{admin.designation}</li>
                                    <li className='list-group-item'> <b>Joining Date: </b>{admin.joinDate}</li>
                                    {/* <li className='list-group-item'> <b>sick leave balance: </b>{admin.sickLeaveBalance}</li>
                                    <li className='list-group-item'> <b>casual leave balance: </b>{admin.casualLeaveBalance}</li>
                                    <li className='list-group-item'> <b>privileged leave balance: </b>{admin.privilegeLeaveBalance}</li>
                                    <li className='list-group-item'> <b>Total leaves taken: </b>{totalLeaves}</li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDetails