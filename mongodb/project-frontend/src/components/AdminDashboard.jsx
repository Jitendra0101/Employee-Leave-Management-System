import React, { useState, useEffect } from 'react';
import { listWorkers } from '../services/WorkerService';
import TableDataForAdmin from './TableDataForAdmin';

const AdminDashboard = () => {

    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        listWorkers().then((resp) => {
            setWorkers(resp.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

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

            <TableDataForAdmin workersList={workers} />

        </div>
    )
}

export default AdminDashboard