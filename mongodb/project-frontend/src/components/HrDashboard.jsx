import React, { useState, useEffect } from 'react';
import { listWorkers } from '../services/WorkerService';
import { useNavigate } from "react-router-dom";
import TableDataForHr from '../TableData/TableDataForHr';
import axios from 'axios';
const HrDashboard = () => {

    const navigate = useNavigate();
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        loadWorkers()
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
    }
    const handleDeleteHr = async (id) => {
        try {
            await axios.delete(`http://localhost:6900/api/workers/${id}`);
            loadWorkers();
        } catch (error) {
            console.error(error);
        }
    };
    const handleAddEmployee = () => {
        navigate("/addemployee");
    }

    // useEffect(() => {
    //     // Fetch workers data from backend upon component mount
    //     // You can use fetch or axios for making HTTP requests
    //     // Update workers state with the fetched data
    // }, []);

    // const handleCreate = () => {
    //     // Implement create operation
    // };

    // const handleUpdate = (username) => {
    //     // Implement update operation
    // };

    // const handleDelete = (username) => {
    //     // Implement delete operation
    // };

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
                            <button className="button is-primary"  style={{ marginRight: '10px', borderRadius: '9px', height: '45px', fontSize: '18px' }}>
                                    <strong>View Leaves</strong>
                                </button>
                                <button className="button is-primary" onClick={handleAddEmployee} style={{ marginRight: '10px', borderRadius: '9px', height: '45px', fontSize: '18px' }}>
                                    <strong>Add Employee</strong>
                                </button>
                                <button className="button is-primary" onClick={handleLogOut} style={{ marginRight: '30px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                    <strong>Logout</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


            {/* <button onClick={handleCreate}>Create Worker</button>
            <ul>
                {workers.map((worker) => (
                    <li key={worker.username}>
                        {worker.username} - {worker.designation}
                        <button onClick={() => handleUpdate(worker.username)}>Edit</button>
                        <button onClick={() => handleDelete(worker.username)}>Delete</button>
                    </li>
                ))}
            </ul> */}

            <div className='mt-4'>
                <TableDataForHr workersList={workers}  onDeleteHr={handleDeleteHr}/>
            </div>

        </div>
    )
}

export default HrDashboard