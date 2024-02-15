import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const TableDataForHr = ({ workersList, onDeleteHr, hrid }) => {

    const [filteredWorkers, setFilteredWorkers] = useState([]);

    useEffect(() => {
        const Employees = workersList.filter(worker => worker.designation === 'EMPLOYEE');
        setFilteredWorkers(Employees);
    }, [workersList]);

    const handleDelete = async (id) => {
        try {
            await onDeleteHr(id);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h2 className='text-center' style={{ marginBottom: '40px', marginTop: '20px' }}>Hr DashBoard</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table className="table table-striped table-bordered" style={{ width: 'fit-content' }}>
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Worker user name</th>
                            <th>Worker email</th>
                            <th>Worker designation</th>
                            <th>Worker joining date</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorkers.map((worker, index) =>
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
                                    <Link className="btn btn-warning" to={`/hr/${hrid}/manageleave/${worker.id}`} style={{ marginRight: '20px', borderRadius: '9px', width: '145px', height: '45px', fontSize: '18px' }}>
                                        Manage Leave
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
        </div>
    );
}

export default TableDataForHr;
