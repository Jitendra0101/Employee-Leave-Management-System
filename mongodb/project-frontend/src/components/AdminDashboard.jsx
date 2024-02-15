import React, { useState, useEffect } from 'react';
import { listWorkers } from '../services/WorkerService';
import TableDataForAdmin from '../TableData/TableDataForAdmin';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({});
    const [workers, setWorkers] = useState([]);
    const [nonAdminWorkers, setNonAdminWorkers] = useState([]);
    const { adminid } = useParams();

    useEffect(() => {
        loadAdmin();
        loadWorkers();
    }, []);

    const loadAdmin = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/api/workers/${adminid}`);
            setAdmin(response.data);
        } catch (error) {
            console.error('Error fetching admin:', error);
        }
    };

    const loadWorkers = async () => {
        try {
            const response = await listWorkers();
            setWorkers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const filteredWorkers = workers.filter(worker => worker.designation !== 'ADMIN');
        setNonAdminWorkers(filteredWorkers);
    }, [workers]);

    const handleLogOut = () => {
        navigate("/");
    };

    const handleAddWorker = () => {
        navigate("/addworker");
    };

    const handleMyProfile = () => {
        navigate(`/admin/${adminid}/details`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:6900/api/workers/${id}`);
            loadWorkers();
        } catch (error) {
            console.error(error);
        }
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
                                    <button className="button is-primary" onClick={handleAddWorker} style={{ marginRight: '10px', borderRadius: '9px', height: '45px', fontSize: '18px' }}>
                                        <strong>Add Worker</strong>
                                    </button>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic " style={{ marginRight: '20px' }}>
                                            <strong>{admin.userName}</strong>
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
                <TableDataForAdmin workersList={nonAdminWorkers} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default AdminDashboard;
