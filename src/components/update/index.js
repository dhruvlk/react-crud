import axios from 'axios'
import React, { useState } from 'react'

import { Button, Form, Modal } from 'react-bootstrap'
import '../../index.css'

export const UpdateUser = ({ show, onHide, updateDetails, setApiData }) => {
  const [data, setData] = useState({
    name: updateDetails?.name ? updateDetails?.name : '',
    email: updateDetails?.email ? updateDetails?.email : '',
    gender: updateDetails?.gender ? updateDetails?.gender : '',
    status: updateDetails?.status ? updateDetails?.status : ''
  })
  const [validation, setValidation] = useState([])

  const [validated, setValidated] = useState(false)
  const [formValues, setFormValues] = useState("")
  const [formErrors, setFormErrors] = useState({})


  const handleChange = (event) => {
    const { name, value } = event.target

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
    // setFormValues({ ...formValues, [name]: value })
  }


  // const validate = (values) => {
  //   const errors = {}
  //   const regexName = /^[a-zA-Z ]{2,30}$/
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

  //   if (!values.name) {
  //     errors.name = "Name is required!"
  //   } else if (!regexName.test(values.name)) {
  //     if (!values.email) {
  //       errors.email = "Email is required!"
  //     } else if (!regex.test(values.email)) {
  //       errors.email = "This is not a valid email format!"
  //     }
  //   }

  //   if (!values.gender) {
  //     errors.gender = "gender is required!"
  //   } else if (!regex.test(values.gender)) {
  //     if (!values.status) {
  //       errors.status = "status is required!"
  //     } else if (!regex.test(values.status))
  //       return errors
  //   }
  // }


  const handleSubmit = async (event) => {
    event.preventDefault()
    // setFormErrors(validate(formValues))
    // setValidated(true)
    await axios.patch(`https://gorest.co.in/public/v2/users/${updateDetails.id}`, data, {
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
    }).catch(err => setValidation(err.response.data))
  }

  return (
    <Modal
      className='modelDesign'
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder='Name'
              required
            />

          </Form.Group>
          <p>{formErrors.name}</p>
          <br />
          <Form.Group controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={data.email}
              placeholder='email'
              onChange={handleChange}
              required
              pattern=".+@gmail\.com"
            />

          </Form.Group>
          <p>{formErrors.email}</p>
          <p>{validation[0]?.field === 'email' && `Email ${validation[0]?.message}`}</p>
          <br />
          <Form.Group controlId="validationCustom03">
            <Form.Label>Gender</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                value="male"
                onChange={handleChange}
                checked={data.gender === 'male' && 'male'}
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                value="female"
                checked={data.gender === 'female' && 'female'}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <p>{formErrors.gender}</p>
          <br />

          <Form.Group controlId="validationCustom04">
            <Form.Select
              name="status"
              value={data.status}
              onChange={handleChange}
              required
            >
              <option></option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Form.Group>
          <p>{formErrors.status}</p>
          <br />
          <Button type='submit'>Update </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
