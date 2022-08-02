import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export const CreateUser = ({ show, onHide, setApiData = {}, updateDetails = {} }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    gender: '',
    status: ''
  })

  const [validated, setValidated] = useState(false)

  console.log(updateDetails)

  const handleChange = (event) => {
    const { name, value } = event.target

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // const form = event.currentTarget
    // if (form.checkValidity() === false) {
    //   event.stopPropagation()
    //   event.preventDefault()
    // }
    // setValidated(true)
    // if (validated) {
    await axios.post('https://gorest.co.in/public/v2/users', data, {
      headers: {
        'Authorization': 'Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e'
      }
    }).then(res => {
      axios.get('https://gorest.co.in/public/v2/users', {
        headers: { 'Authorization': 'Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e' }
      }).then((getData) => {
        setApiData(getData.data)
        onHide()
      })
    }).catch(err => console.log(err))
    // }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name"
              onChange={handleChange}
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
              onChange={handleChange}
              required
              pattern=".+@gmail\.com"
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          </Form.Group>

          <br />
          <Form.Group controlId="validationCustom03">
            <Form.Label>Gender</Form.Label>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                value="male"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                value="female"
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
          <Form.Group controlId="validationCustom04">
            <Form.Select
              name="status"
              onChange={handleChange}
              required
            >
              <option>Open this select menu</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
