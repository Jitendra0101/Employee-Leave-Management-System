import React from 'react';

const TableDataForEmployee = ({ leaveList }) => {

    return (
        <div>
            <h2 className='text-center' style={{ marginBottom: '40px', marginTop: '20px' }}>My Leaves</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table className="table table-striped table-bordered" style={{ width: 'fit-content' }}>
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Leave Type</th>
                            <th>Status</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveList.map((leave, index) =>
                            <tr key={leave.id}>
                                <td>{index + 1}</td>
                                <td>{leave.startDate}</td>
                                <td>{leave.endDate}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.status}</td>
                                <td>{leave.reason}</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableDataForEmployee;
