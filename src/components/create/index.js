import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import '../../index.css'


export const CreateUser = ({ show, onHide, setApiData = {} }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    gender: '',
    status: ''
  })
  const [formValues, setFormValues] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [validation, setValidation] = useState([])

  const handleChange = (event) => {
    const { name, value } = event.target

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const errors = validate(formValues)
    setFormErrors(errors)
    if (Object.keys(errors).length <= 0) {
      setIsSubmit(true)
      await axios.post('https://gorest.co.in/public/v2/users', data, {
        headers: {
          'Authorization': 'Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e'
        }
      }).then(res => {
        onHide()
        axios.get('https://gorest.co.in/public/v2/users', {
          headers: { 'Authorization': 'Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e' }
        }).then((getData) => {
          setApiData(getData.data)
        })
      }).catch(err => {
        setValidation(err.response.data)
      })
    }
    // setIsSubmit(true)
    // event.preventDefault()
    // const form = event.currentTarget
    // if (form.checkValidity() === false) {
    //     event.stopPropagation()
    //     event.preventDefault()
    // }
  }
  useEffect(() => {
    console.log(formErrors)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues)
    }
  }, [formErrors, formValues, isSubmit])

  console.log(validation)

  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

    if (!values.name) {
      errors.name = "Name is required!"
    } else if (!regex.test(values.name)) {
      // errors.name = "This is not a valid name format!"
    }

    if (!values.email) {
      errors.email = "Email is required!"
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!"
    }

    if (!values.gender) {
      errors.gender = "gender is required!"
    } else if (!regex.test(values.gender)) {
      // errors.gender = "This is not a valid gender format!"
    }

    if (!values.status) {
      errors.status = "status is required!"
    } else if (!regex.test(values.status)) {
      // errors.status = "This is not a valid status format!"
    }
    return errors
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
          Create User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name"
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
              placeholder='email'
              onChange={handleChange}
              required
            />

          </Form.Group>
          <p>{formErrors.email}</p>
          <p>{validation[0]?.field === 'email' && `Email ${validation[0]?.message}`}</p>
          <br />
          <Form.Group controlId="validationCustom03" required>
            <Form.Label>Gender</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                value="male"
                onChange={handleChange}
                required
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                value="female"
                onChange={handleChange}
                required
              />
            </div>
          </Form.Group>
          <p>{formErrors.gender}</p>
          <br />

          <Form.Group controlId="validationCustom04">
            <Form.Select
              name="status"
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


          <Button onClick={handleSubmit} type='submit'>Submit</Button>


          {/* <Spinner animation="border" variant="primary" /> */}

        </Form>
      </Modal.Body>
    </Modal>
  )
}
