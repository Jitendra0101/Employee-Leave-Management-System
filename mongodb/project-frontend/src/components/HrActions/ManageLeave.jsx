import React, { useEffect, useState } from 'react'
import ListOfLeaves from './ListOfLeaves'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ManageLeave = () => {

    const [leaves, setLeaves] = useState([]);
    const { workerid } = useParams();

    // const { status } = leave;

    useEffect(() => {
        loadLeaves();
    }, []);

    const handleOnAccept = async (leaveid) => {
        try {
            const updatedLeave = { status: "ACCEPTED" };
            await axios.put(`http://localhost:6900/${workerid}/leaves/${leaveid}`, updatedLeave);
            loadLeaves();
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnReject = async (leaveid) => {
        try {
            const updatedLeave = { status: "REJECTED" };
            await axios.put(`http://localhost:6900/${workerid}/leaves/${leaveid}`, updatedLeave);
            loadLeaves();
        } catch (error) {
            console.error(error);
        }
    };



    const loadLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:6900/${workerid}/leaves`);
            setLeaves(response.data);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    }

    const handleGoBack = () => {
        window.history.back();
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark" style={{ height: '80px', paddingLeft: '20px' }}>
                <div className="navbar-brand">Employee Leave Management</div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <button className="button is-primary" onClick={handleGoBack} style={{ marginRight: '30px', borderRadius: '9px', width: '90px', height: '45px', fontSize: '18px' }}>
                                    <strong>Go Back</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='section' style={{ minHeight: 'calc(100vh - 0px)', marginTop: '20px' }}>
                <div className='mt-4'>
                    <ListOfLeaves leaveList={leaves} onAccept={handleOnAccept} onReject={handleOnReject} />
                </div>
            </div>

        </div>
    )
}

export default ManageLeave