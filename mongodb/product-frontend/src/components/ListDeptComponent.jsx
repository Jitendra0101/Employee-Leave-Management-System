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

            <h2 className='text-center'>List of products</h2>

            <table className='table table-striped table-bordered' style={{ width: 'fit-content' }}>
                <thead>
                    <tr>
                        <th>department id</th>
                        <th>product name</th>
                        <th>product price</th>
                        <th>product quantity</th>
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
                                    {department.name}
                                </td>
                                <td>
                                    {department.price}
                                </td>
                                <td>
                                    {department.quantity}
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ListDeptComponent