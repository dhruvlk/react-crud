import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../index.css'

export default function Read() {
    const [apiData, setApiData] = useState([])
    useEffect(() => {
        axios.get(`https://gorest.co.in/public/v2/users`, {
            headers: { 'Authorization': `Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e` }
        })
            .then((getData) => {
                setApiData(getData.data)
            })
    }, [])

    const setData = (id, name, email, gender, status) => {
        localStorage.setItem('ID', id)
        localStorage.setItem('name', name)
        localStorage.setItem('email', email)
        localStorage.setItem('gender', gender)
        localStorage.setItem('status', status)
    }

    const getData = () => {
        axios.get(`https://gorest.co.in/public/v2/users`, {
            headers: { 'Authorization': `Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e` }
        })
            .then((getData) => {
                setApiData(getData.data)
            })
    }

    const onDelete = (id) => {
        axios.delete(`https://gorest.co.in/public/v2/users/${id}`, {
            headers: { 'Authorization': `Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e` }
        })
            .then(() => {
                getData()
            })
    }

    return (
        <>
            <div className='tbl-header'>
                <Table cellPadding="0" cellSpacing="0" border="0" striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                </Table>
                <div className='tbl-content'>
                    <Table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {apiData.map((data) => {
                                return (
                                    <tr>
                                        <td>{data.id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.gender}</td>
                                        <td>{data.status}</td>

                                        <td>
                                            <Link to='/update'>
                                                <Button
                                                    onClick={() => setData(data.id, data.name, data.email, data.gender, data.status)}>
                                                    U
                                                </Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button color="red" onClick={() => onDelete(data.id)}>D</Button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>
                </div>
                {/* </Table> */}
            </div>
        </>
    )
}
