import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Create() {
    let navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [status, setStatus] = useState('')
    const [validated, setValidated] = useState(false)

    const sendDataToAPI = () => {
        axios.post(`https://gorest.co.in/public/v2/users`,
            {
                name,
                email,
                gender,
                status
            }, {
            headers: { 'Authorization': `Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e` }
        }).then(() => {
            navigate('../read/read.js')
        },
        )
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        setValidated(true)
    }
    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationCustom01">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name"
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        required
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group controlId="validationCustom02">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        pattern=".+@gmail\.com"
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group>

                {/* <Form.Group controlId="validationCustom03">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        name="gender"
                        placeholder='gender'
                        onChange={(e) => setGender(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group> */}
                <br />
                <Form.Group controlId="validationCustom03">
                    <Form.Label>Gender</Form.Label>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Form.Check
                            type="radio"
                            label="Male"
                            name="gender"
                            value="male"
                            onChange={(e) => setGender(e.target.value)}

                        />

                        <Form.Check
                            type="radio"
                            label="Female"
                            name="gender"
                            value="female"
                            onChange={(e) => setGender(e.target.value)}

                        />
                    </div>
                </Form.Group>
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>

                {/* <Form.Group controlId="validationCustom04">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        name="status"
                        placeholder='status'
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                </Form.Group> */}
                <br />
                <Form.Group controlId="validationCustom04">
                    <Form.Select
                        name="status"
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option>Open this select menu</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Form.Select>
                </Form.Group>
                <br />
                <Button type='submit' onClick={sendDataToAPI}>Submit</Button>
            </Form>
        </div>
    )
}
