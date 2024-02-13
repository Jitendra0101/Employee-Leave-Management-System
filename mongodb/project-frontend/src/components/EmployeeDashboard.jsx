import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TableDataForEmployee from '../TableData/TableDataForEmployee';
import { listLeavesByWorkerId } from '../services/GetLeaveByWorkerid';

const EmployeeDashboard = () => {

    const navigate = useNavigate();
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        listLeavesByWorkerId().then((resp) => {
            setLeaves(resp.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    const handleLogOut = () => {
        navigate("/");
    }

    const handleAddLeave = () => {
        navigate("/addleave");
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
                                <button className="button is-primary" onClick={handleAddLeave} style={{ marginRight: '10px', borderRadius: '9px', height: '45px', fontSize: '18px' }}>
                                    <strong>Add Leave</strong>
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
                <TableDataForEmployee leaveList={leaves} />
            </div>

        </div>
    )
}

export default EmployeeDashboard