import React, { useState, useEffect } from 'react';
import { listWorkers } from '../services/WorkerService';
import TableDataForAdmin from '../TableData/TableDataForAdmin';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        loadWorkers();
    }, []);

    const loadWorkers = async () => {
        try {
            const response = await listWorkers();
            setWorkers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogOut = () => {
        navigate("/");
    };

    const handleAddWorker = () => {
        navigate("/addworker");
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
                                <button className="button is-primary" onClick={handleAddWorker} style={{ marginRight: '10px', borderRadius: '9px', height: '45px', fontSize: '18px' }}>
                                    <strong>Add Worker</strong>
                                </button>
                                <button className="button is-primary" onClick={handleLogOut} style={{ marginRight: '30px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                    <strong>Logout</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='mt-4'>
                <TableDataForAdmin workersList={workers} onDelete={handleDelete} />
            </div>

        </div>
    );
};

export default AdminDashboard;
