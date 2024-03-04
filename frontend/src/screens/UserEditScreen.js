import React, {useState, useEffect} from 'react'
import { Form, Button, FormGroup } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/UserConstants'


import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'

function UserEditScreen() {

    const {id} = useParams()

    const [username, setUsername] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    let navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }else {
            if(!user.username || user._id !== Number(id)){
                dispatch(getUserDetails(id))
            } else {
                setUsername(user.username)
                setFirstname(user.first_name)
                setLastname(user.last_name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, id, successUpdate, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if(window.confirm('Czy na pewno chcesz zmienić dane tego użytkownika?')) {
            dispatch(updateUser({
                _id: id,
                'username': username,
                'first_name': firstname,
                'last_name': lastname,
                'email': email,
                'isAdmin': isAdmin
            }))
        }
        
    }


  return (
    <div>
        <Header/>
            <div className='p-3'>
                <Link to='/admin/userlist'>
                    Powrót
                </Link>
                
                <h2>Edytuj użytkownika</h2>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                    {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                        <Form onSubmit={submitHandler} className='list-of-forms-from-profile-screen'>
                            <FormGroup controlId='username'>
                                <Form.Label>Nazwa użytkownika</Form.Label>
                                <Form.Control
                                    className=''
                                    type='text'
                                    placeholder='Wprowadz nazwę użytkownika'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                >
                                </Form.Control>
                            </FormGroup>

                            <FormGroup controlId='firstname'>
                                <Form.Label>Imię</Form.Label>
                                <Form.Control
                                    className=''
                                    type='text'
                                    placeholder='Wprowadz imię'
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                >
                                </Form.Control>
                            </FormGroup>

                            <FormGroup controlId='lastname'>
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control
                                    className=''
                                    type='text'
                                    placeholder='Wprowadz nazwisko'
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                >
                                </Form.Control>
                            </FormGroup>

                            <FormGroup controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    className=''
                                    type='email'
                                    placeholder='Wprowadz email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </FormGroup>

                            <FormGroup controlId='isadmin'>
                                <Form.Label>Admin</Form.Label>
                                <Form.Check
                                    className=''
                                    type='checkbox'
                                    label='Jest adminem'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </FormGroup>

                            <Button className='btn-info' type='submit' variant='secondary'>
                                Update
                            </Button>
                        </Form>
                    )}
            </div>
        <Footer/>
    </div>
  )
}

export default UserEditScreen