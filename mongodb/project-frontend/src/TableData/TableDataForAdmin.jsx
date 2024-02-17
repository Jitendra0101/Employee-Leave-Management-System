import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const TableDataForAdmin = ({ workersList, onDelete }) => {

    const navigate = useNavigate();

    const handleAddWorker = () => {
        navigate("/addworker");
    };

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
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                {/* Add a button on the top left side */}
                <button className="btn btn-secondary" onClick={handleAddWorker} style={{ marginBottom: '10px', marginRight: '785px', borderRadius: '9px', width: '150px', height: '45px', fontSize: '18px' }}>
                    Add Worker
                </button>

                {/* Table */}
                <div>
                    <table className="table table-striped table-bordered" style={{ width: 'fit-content', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black' }}>Sr. No</th>
                                <th style={{ border: '1px solid black' }}>User Name</th>
                                <th style={{ border: '1px solid black' }}>Email</th>
                                <th style={{ border: '1px solid black' }}>Designation</th>
                                <th style={{ border: '1px solid black' }}>Joining Date</th>
                                <th style={{ border: '1px solid black', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workersList.map((worker, index) =>
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
        </div>


    )
}

export default TableDataForAdmin