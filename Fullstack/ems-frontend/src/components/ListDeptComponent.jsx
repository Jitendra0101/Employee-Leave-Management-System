import React, {useEffect, useState} from 'react'
import { listDepartments } from '../services/DepartmentService'

const ListDeptComponent = () => {

   const [departments, setDepartments] = useState([])

   useEffect(() => {
    listDepartments().then((resp) => {
        setDepartments(resp.data);
    }).catch(error => {
        console.error(error);
    })
   })

    return (
        <div className='container'>

            <h2 className='text-center'>List of Departments</h2>

            <table className='table table-striped table-bordered' style={{ width: 'fit-content' }}>
                <thead>
                    <tr>
                        <th>department id</th>
                        <th>department name</th>
                        <th>department location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map(department =>
                            <tr key={department.id}>
                                <td>
                                    {department.id}
                                </td>
                                <td>
                                    {department.deptName}
                                </td>
                                <td>
                                    {department.location}
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ListDeptComponent