import React, { useState, useEffect } from 'react';
import { listWorkers } from '../services/WorkerService';
import { useNavigate, useParams } from "react-router-dom";
import TableDataForHr from '../TableData/TableDataForHr';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
const HrDashboard = () => {

    const navigate = useNavigate();
    const [workers, setWorkers] = useState([]);
    const [Hr, setHr] = useState({});
    const { id } = useParams();

    useEffect(() => {
        loadWorkers()
        loadHr()
    }, []);


    const loadWorkers = async () => {
        try {
            const response = await listWorkers();
            setWorkers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadHr = async () => {
        try {
            const hrResp = await axios.get(`http://localhost:6900/api/workers/${id}`);
            setHr(hrResp.data);
        } catch (error) {
            console.error(error)
        }

    }

    const handleLogOut = () => {
        navigate("/");
    }

    const handleMyProfile = () => {
        navigate(`/hr/${id}/details`);
    }

    const handleDeleteHr = async (id) => {
        try {
            await axios.delete(`http://localhost:6900/api/workers/${id}`);
            loadWorkers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddEmployee = () => {
        navigate("/addemployee");
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
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <button className="button is-primary" onClick={handleAddEmployee} style={{ marginRight: '10px', borderRadius: '9px', height: '45px', fontSize: '18px' }}>
                                        <strong>Add Employee</strong>
                                    </button>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic " style={{ marginRight: '20px' }}>
                                            <strong>{Hr.userName}</strong>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={handleMyProfile}>My Profile</Dropdown.Item>
                                            <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='mt-4'>
                <TableDataForHr workersList={workers} onDeleteHr={handleDeleteHr} hrid={id} />
            </div>

        </div>
    )
}

export default HrDashboard
