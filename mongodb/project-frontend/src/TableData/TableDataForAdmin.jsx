import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { listWorkers } from '../services/WorkerService';

const TableDataForAdmin = ({ workersList, onDelete }) => {

    const [workers, setWorkers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadWorkers();
    }, [])

    const loadWorkers = async () => {
        try {
            const response = await listWorkers();
            setWorkers(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Inside TableDataForAdmin component
    const handleDelete = async (id) => {
        try {
            await onDelete(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2 className='text-center' style={{ marginBottom: '40px', marginTop: '20px' }}>Admin DashBoard</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table className="table table-striped table-bordered" style={{ width: 'fit-content' }}>
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>user name</th>
                            <th>email</th>
                            <th>designation</th>
                            <th>joining date</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {workersList.map((worker, index) =>
                            <tr key={worker.id}>
                                <td>{index + 1}</td>
                                <td>{worker.userName}</td>
                                <td>{worker.email}</td>
                                <td>{worker.designation}</td>
                                <td>{worker.joinDate}</td>
                                <td>
                                    <Link className="btn btn-primary" to={`/viewworker/${worker.id}`} style={{ marginLeft: '10px', marginRight: '20px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                        View
                                    </Link>
                                    <Link className="btn btn-secondary" to={`/editworker/${worker.id}`} style={{ marginRight: '20px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger" onClick={(e) => handleDelete(worker.id)} style={{ marginRight: '10px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div >

    )
}

export default TableDataForAdmin