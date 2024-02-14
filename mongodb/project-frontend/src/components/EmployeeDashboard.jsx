import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import TableDataForEmployee from '../TableData/TableDataForEmployee';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const [leaves, setLeaves] = useState([]);
    const [worker, setWorker] = useState({});
    const { id } = useParams();

    useEffect(() => {
        loadLeaves()
        loadWorker()
    }, [])

    const loadLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/${id}/leaves`);
            setLeaves(response.data);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    }

    const loadWorker = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/api/workers/${id}`);
            setWorker(response.data);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    }

    const handleLogOut = () => {
        navigate("/");
    }

    const handleMyProfile = () => {
        navigate(`/employee/${id}/details`);
    }

    const handleAddLeave = () => {
        navigate(`/employee/${id}/addleave`);
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark" style={{ height: '80px', paddingLeft: '20px' }}>
                <div className="navbar-brand">
                    Employee Leave Management
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <button className="button is-primary" onClick={handleAddLeave} style={{ marginRight: '10px', borderRadius: '9px', height: '45px', fontSize: '18px' }}>
                                        <strong>Add Leave</strong>
                                    </button>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic " style={{ marginRight: '20px' }}>
                                            <strong>{worker.userName}</strong>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={handleMyProfile}>My Profile</Dropdown.Item>
                                            <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='mt-4'>
                <TableDataForEmployee leaveList={leaves} />
            </div>

        </div>
    )
}

export default EmployeeDashboard;
