import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { listWorkers } from '../services/WorkerService';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        listWorkers().then((resp) => {
            setWorkers(resp.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    const handleAddWorker = () => {
        navigate("/addworker");
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
                                <button onClick={handleAddWorker} className="button is-primary" style={{ marginRight: '10px', borderRadius: '9px', height: '45px', fontSize: '18px' }}>
                                    <strong>Add Worker</strong>
                                </button>
                                <button className="button is-primary" onClick={() => navigate("/")} style={{ marginRight: '30px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                    <strong>Logout</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='mt-4'>
                <div className='py-4' style={{ width: '80%', margin: '0 auto' }}>
                    <table className='table table-bordered table-hover'>
                        <thead className="thead-dark">
                            <tr>
                                <th scope='col'>Sr. No</th>
                                <th scope='col'>Worker User Name</th>
                                <th scope='col'>Worker Email</th>
                                <th scope='col'>Worker Designation</th>
                                <th scope='col'>Worker Joining Date</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                workers.map((worker, index) => (
                                    <tr key={worker.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{worker.userName}</td>
                                        <td>{worker.email}</td>
                                        <td>{worker.designation}</td>
                                        <td>{worker.joinDate}</td>
                                        <td>
                                            <Link className='btn btn-primary mx-2' to={`/viewWorker/${worker.id}`}>View</Link>
                                            <Link className='btn btn-outline-primary mx-2' to={`/editWorker/${worker.id}`}>Edit</Link>
                                            <button className='btn btn-danger mx-2'>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;