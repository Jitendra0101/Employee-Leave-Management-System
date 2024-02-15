import React from 'react';

const ListOfLeaves = ({ leaveList, onAccept, onReject }) => {
    const handleOnReject = async (id) => {
        try {
            await onReject(id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnAccept = async (id) => {
        try {
            // Update the status in the server and then update the local state
            await onAccept(id);
        } catch (error) {
            console.error(error);
        }
    };

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
                            <th>Actions</th>
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
                                <td>
                                    <button className="btn btn-success" onClick={() => handleOnAccept(leave.id)} style={{ marginRight: '10px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                        Accept
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleOnReject(leave.id)} style={{ marginRight: '10px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListOfLeaves;
