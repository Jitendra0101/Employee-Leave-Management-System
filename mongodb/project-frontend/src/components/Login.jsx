import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { listWorkers } from '../services/WorkerService';

function Login() {
    let navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [workers, setWorkers] = useState([]);
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        listWorkers().then((resp) => {
            setWorkers(resp.data);
        }).catch(error => {
            console.error(error);
        });
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const handleLogin = () => {
        let foundWorker = workers.find(worker => worker.userName === username && worker.password === password);
        if (foundWorker) {
            setLoggedIn(true);
            setWorker(foundWorker);
        }
    };

    if (loggedIn) {
        switch (worker.designation) {
            case "ADMIN":
                return navigate("/admin");;

            case "EMPLOYEE":
                return navigate("/employee");

            case "HR":
                return navigate("/hr");

            default:
                break;
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;