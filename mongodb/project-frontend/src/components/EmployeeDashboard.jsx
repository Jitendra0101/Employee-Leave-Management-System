import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TableDataForEmployee from '../TableData/TableDataForEmployee';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    const [leaves, setLeaves] = useState([]);
    const [worker, setWorker] = useState({});
    const [showProfileModal, setShowProfileModal] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        loadLeaves();
        loadWorker();
    }, []);

    const loadLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/${id}/leaves`);
            setLeaves(response.data);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    };

    const loadWorker = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/api/workers/${id}`);
            setWorker(response.data);
        } catch (error) {
            console.error('Error fetching worker:', error);
        }
    };

    const handleLogOut = () => {
        navigate("/");
    };

    const handleMyProfile = () => {
        setShowProfileModal(true);
    };

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
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ marginRight: '30px', borderRadius: '9px', width: '100px', height: '45px', fontSize: '18px', backgroundColor: 'white', color: 'black', border: 'solid' }}>
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

            <section className="section" style={{ minHeight: 'calc(100vh - 80px)' }}>

                <div className='mt-4'>
                    <TableDataForEmployee leaveList={leaves} empid={id} />
                </div>
            </section>

            <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{worker.userName}'s Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                                <h2 className='text-center m-4'>Profile Details</h2>
                                <div className='card'>
                                    <div className='card-header'>
                                        Details:
                                        <ul className='list-group list-group-flush'>
                                            <li className='list-group-item'> <b>Name: </b>{worker.userName}</li>
                                            <li className='list-group-item'> <b>Password: </b>{worker.password}</li>
                                            <li className='list-group-item'> <b>Email: </b>{worker.email}</li>
                                            <li className='list-group-item'> <b>Designation: </b>{worker.designation}</li>
                                            <li className='list-group-item'> <b>Joining Date: </b>{worker.joinDate}</li>
                                            <li className='list-group-item'> <b>Sick Leave Balance: </b>{worker.sickLeaveBalance}</li>
                                            <li className='list-group-item'> <b>casual Leave Balance: </b>{worker.casualLeaveBalance}</li>
                                            <li className='list-group-item'> <b>Privileged Leave Balance: </b>{worker.privilegeLeaveBalance}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EmployeeDashboard;
