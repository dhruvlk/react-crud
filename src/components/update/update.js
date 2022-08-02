import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Update() {
    let navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [status, setStatus] = useState('')

    const [ID, setID] = useState(null)
    const sendDataToAPI = () => {
        axios.put(`https://gorest.co.in/public/v2/users/${ID}`,
            {
                name,
                email,
                gender,
                status
            }, {
            headers: { 'Authorization': `Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e` }
        }).then(() => {
            navigate('../read/read.js')
        })
    }

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setName(localStorage.getItem('name'))
        setEmail(localStorage.getItem('email'))
        setGender(localStorage.getItem('gender'))
        setStatus(localStorage.getItem('status'))
    }, [])

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='First Name' />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        value={email}
                        placeholder='Last Name'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                {/* <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        name="gender"
                        value={gender}
                        placeholder='Gender'
                        onChange={(e) => setGender(e.target.value)}
                    />
                </Form.Group> */}


                <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Form.Check
                            type="radio"
                            value={gender}
                            label="Male"
                            name="gender"
                            onChange={(e) => setGender(e.target.value)}

                        />

                        <Form.Check
                            type="radio"
                            value={gender}
                            label="Female"
                            name="gender"
                            onChange={(e) => setGender(e.target.value)}

                        />
                    </div>
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        name="status"
                        value={status}
                        placeholder='Status'
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </Form.Group> */}
                <Form.Group>
                    <Form.Select
                        name="status"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        required
                    >
                        <option>Open this select menu</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Form.Select>
                </Form.Group>
                <br />
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}
