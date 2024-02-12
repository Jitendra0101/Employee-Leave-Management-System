import React, { useState, useEffect } from 'react';

const TableDataForHr = ({ workersList }) => {
    const [filteredWorkers, setFilteredWorkers] = useState([]);

    useEffect(() => {
        const nonAdminWorkers = workersList.filter(worker => worker.designation !== 'ADMIN');
        setFilteredWorkers(nonAdminWorkers);
    }, [workersList]);

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
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableDataForHr;
