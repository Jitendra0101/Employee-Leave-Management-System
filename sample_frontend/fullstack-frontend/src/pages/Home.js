import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import NavbarAD from '../layout/AdminLayout/NavbarAD';
import '../CSS/Login.css'
import { listWorkers } from '../service/WorkerService';

export default function Home() {
    // const [users, setUsers] = useState([]);
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        listWorkers().then((resp) => {
            setWorkers(resp.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);
    // const {id}= useParams();

    // useEffect(()=>{
    //     loadUsers();
    // },[])


    // useEffect(() => {
    //     listWorkers().then((resp) => {
    //         setWorkers(resp.data);
    //     }).catch(error => {
    //         console.error(error);
    //     });
    // }, []);

    // const loadUsers=async()=>{
    //     const result = await axios.get("http://localhost:8080/users")
    //     setUsers(result.data);

    // }

    // const deleteUser= async (id)=>{
    //   await  axios.delete(`http://localhost:8080/user/${id}`)
    //   loadUsers();
    // }

  return (
    <div className=''>
    <NavbarAD />
    <div className='container '>
      
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">email</th>
      <th scope="col">Designation</th>
      <th scope="col">Join-Date</th>
    </tr>
  </thead>
  <tbody>
    {
        workers.map((user,index)=>(
            <tr>
            <th scope="row" key={index}>{user.id}</th>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>{user.designation}</td>
            <td>{user.joinDate}</td>
            {/* <td>
                <Link className='btn btn-primary mx-2' to={`/viewUser/${user.id}`}>View</Link>
                <Link className='btn btn-outline-primary mx-2' to={`/editUser/${user.id}`}>Edit</Link>
                <button className='btn btn-danger mx-2' onClick={(e)=>deleteUser(user.id)} >Delete</button>
            </td> */}
            </tr>
        ))
    }
  </tbody>
</table>
        </div>

    </div>
    </div>
  )
}
