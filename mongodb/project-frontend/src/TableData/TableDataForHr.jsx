import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const TableDataForHr = ({ workersList, onDeleteHr, hrid }) => {

    const [filteredWorkers, setFilteredWorkers] = useState([]);
    const navigate = useNavigate();

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

    const handleAddEmployee = () => {
        navigate("/addemployee");
    }

    return (
        <div>
            <h2 className='text-center' style={{ marginBottom: '40px', marginTop: '20px' }}>HR DashBoard</h2>

            {/* Add Worker button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn btn-secondary" onClick={handleAddEmployee} style={{ marginBottom: '10px', marginRight: '1135px', borderRadius: '9px', width: '150px', height: '45px', fontSize: '18px' }}>
                    Add Employee
                </button>
            </div>

            {/* Table */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table className="table table-striped table-bordered" style={{ width: 'fit-content', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Sr. No</th>
                            <th style={{ border: '1px solid black' }}>Worker User Name</th>
                            <th style={{ border: '1px solid black' }}>Worker Email</th>
                            <th style={{ border: '1px solid black' }}>Worker Designation</th>
                            <th style={{ border: '1px solid black' }}>Worker Joining Date</th>
                            <th style={{ border: '1px solid black', textAlign: 'center' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorkers.map((worker, index) =>
                            <tr key={worker.id}>
                                <td style={{ border: '1px solid black' }}>{index + 1}</td>
                                <td style={{ border: '1px solid black' }}>{worker.userName}</td>
                                <td style={{ border: '1px solid black' }}>{worker.email}</td>
                                <td style={{ border: '1px solid black' }}>{worker.designation}</td>
                                <td style={{ border: '1px solid black' }}>{worker.joinDate}</td>
                                <td style={{ border: '1px solid black', textAlign: 'center' }}>
                                    <Link className="btn btn-secondary" to={`/viewworker/${worker.id}`} style={{ marginLeft: '10px', marginRight: '20px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                        View
                                    </Link>
                                    <Link className="btn btn-secondary" to={`/editworker/${worker.id}`} style={{ marginRight: '20px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                        Edit
                                    </Link>
                                    <Link className="btn btn-secondary" to={`/hr/${hrid}/manageleave/${worker.id}`} style={{ marginRight: '20px', borderRadius: '9px', width: '145px', height: '45px', fontSize: '18px' }}>
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
