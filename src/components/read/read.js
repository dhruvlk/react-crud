import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import axios from 'axios'

import '../../index.css'
import { CreateUser } from '../create'
import { UpdateUser } from '../update'

export default function Read() {
  const [apiData, setApiData] = useState([])
  const [modalShow, setModalShow] = useState(undefined);
  const [updateModal, setUpdateModal] = useState(undefined)
  const [updateDetails, setUpdateDetails] = useState({})

  useEffect(() => {
    getAllUser()
  }, [])

  const getAllUser = async () => {
    await axios.get(`https://gorest.co.in/public/v2/users`, {
      headers: { 'Authorization': `Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e` }
    }).then((getData) => {
      setApiData(getData.data)
    })
  }

  const onDelete = async (id) => {
    await axios.delete(`https://gorest.co.in/public/v2/users/${id}`, {
      headers: { 'Authorization': `Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e` }
    }).then(async () => {
      await axios.get(`https://gorest.co.in/public/v2/users`, {
        headers: { 'Authorization': `Bearer 97b67a5aa40a3d8a6709e11f8d3986d61d4919be20cf66f961a577d4e3e1b73e` }
      }).then((getData) => {
        setApiData(getData.data)
      })
    })
  }

  const handleOpen = () => {
    setModalShow(!modalShow)
  }

  const handleUpdate = (data) => {
    setUpdateDetails(data)
    setUpdateModal(!updateModal)
  }

  return (
    <>
      <div>
        <h3>React Crud Operations</h3>
        <Button onClick={handleOpen}>Add</Button>
      </div>
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
              {apiData.length && apiData.map((data, key) => {
                return (
                  <tr key={key}>
                    <td>{data?.id}</td>
                    <td>{data?.name}</td>
                    <td>{data?.email}</td>
                    <td>{data?.gender}</td>
                    <td>{data?.status}</td>

                    <td>
                      <svg onClick={() => handleUpdate(data)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                      </svg>
                    </td>
                    <td>
                      <svg onClick={() => onDelete(data.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                      </svg>
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </Table>
        </div>
        {/* </Table> */}
      </div>

      {!!modalShow &&
        <CreateUser show={modalShow} onHide={handleOpen} setApiData={setApiData} />
      }

      {!!updateModal &&
        <UpdateUser
          show={updateModal}
          onHide={handleUpdate}
          updateDetails={updateDetails}
          setApiData={setApiData}
        />
      }
    </>
  )
}
