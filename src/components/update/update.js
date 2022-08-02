import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router'
export default function Update() {
    let history = useHistory()
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
            history.push('/read')
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

                <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        name="gender"
                        value={gender}
                        placeholder='Gender'
                        onChange={(e) => setGender(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        name="status"
                        value={status}
                        placeholder='Status'
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}
