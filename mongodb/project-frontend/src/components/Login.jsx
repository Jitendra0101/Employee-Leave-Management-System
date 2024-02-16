import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Login() {
    let navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [worker, setWorker] = useState({

        userName:'',
        password:''

    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (loggedIn && worker) {
            switch (worker.designation) {
                case "ADMIN":
                    navigate(`/admin/${worker.id}`, { state: { loggedIn: loggedIn } });
                    break;

                case "EMPLOYEE":
                    navigate(`/employee/${worker.id}`, { state: { loggedIn: loggedIn } });
                    break;

                case "HR":
                    navigate(`/hr/${worker.id}`, { state: { loggedIn: loggedIn } });
                    break;

                default:
                    setErrorMessage('No matches found for username or password.');
            }
        }
    }, [loggedIn, worker, navigate]);

    const handleGoBack = () => {
        setLoggedIn(false);
        navigate("/");
    }

    const handleLogin = async () => {
        const send = { userName: username, password: password };
    
        try {
            const response = await axios.post("http://localhost:6900/api/workers/login", send);
            const validWorker = response.data; // Access the data property of the response
            
            if (validWorker) {
                setLoggedIn(true);
                setWorker(validWorker);
            } else {
                setErrorMessage('No matches found for username or password.');
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            setErrorMessage('An error occurred during login.');
        }
    };
    

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
            <section className="section" style={{ paddingTop: '160px', minHeight: 'calc(100vh - 80px)', backgroundImage: 'url(login.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '10px' }}>
                                <div className="card-body" >
                                    <h2 className="text-center mb-4">Login</h2>
                                    <form>
                                        <div className="form-group mb-5"> {/* Added mb-3 class for margin bottom */}
                                            <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        <div className="form-group mb-4"> {/* Added mb-3 class for margin bottom */}
                                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="text-center mb-2"> {/* Added text-center class */}
                                            <button type="button" className="btn" style={{ fontSize: '20px', backgroundColor: 'rgb(75, 130, 195)' }} onClick={handleLogin}>Login</button> {/* Removed btn-block class */}
                                        </div>
                                        {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
