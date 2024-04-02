import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../actions/userActions'
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'

function UserListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const usersList = useSelector(state => state.usersList)
    const {error, loading, users} = usersList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
        
    }, [dispatch, navigate, successDelete, userInfo])

    const deleteHandler = (id) => {
        if(window.confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
            dispatch(deleteUser(id))
        }
    }
  return (
    <div>
        <Header/>
            <h1>Użytkownicy</h1>
            {loading 
            ? <Loader/> 
            : error 
            ? <Message variant='danger'>{error}</Message>
            : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nazwa użytkownika</th>
                            <th>Email</th>
                            <th>Imie</th>
                            <th>Nazwisko</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.isAdmin
                                    ? <FaCheck style={{color: 'green'}}/>
                                    : <FaX style={{color: 'red'}}/>
                                }</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>

                                    <Button style={{color: 'tomato'}} className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                        <FaTrash style={{color:'white'}}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
            }
        <Footer/>
    </div>
  )
}

export default UserListScreen