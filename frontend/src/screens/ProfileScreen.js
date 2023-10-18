import React, {useState, useEffect} from 'react'
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap'
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile, } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/UserConstants'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProfileScreen() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()

    let navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const submitHandler = (e) => {
        e.preventDefault()
        
        if(password !== confirmPassword){
            setMessage('Hasła nie są takie same')
        } else {
            dispatch(updateUserProfile({
                'id':user._id,
                'first_name':firstname,
                'last_name':lastname,
                'email':email,
                'password':password
            }))
            setMessage("")
        }
    }

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setFirstname(user.first_name)
                setLastname(user.last_name)
                setEmail(user.email)
                setPassword("")
                setConfirmPassword("")
            }
        }
    }, [dispatch, navigate, userInfo, user, success])
  return (
    <div>
        <Header/>
            <div className='p-3'>
                <Row className='shopscreen-row'>
                    <Col md={3}>
                        <h2>Profil użytkownika</h2>
                        {message && <Message>{message}</Message>}
                        {success && window.alert("Dane użytkownika zostały zaaktualizowane.")}
                        {error && <Message>{error}</Message>}
                        {loading && <Loader/>}
                        <Form onSubmit={submitHandler}>
                            <FormGroup controlId='firstname'>
                                <Form.Label>Imię</Form.Label>
                                <Form.Control
                                    required
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
                                    required
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
                                    required
                                    type='email'
                                    placeholder='Wprowadz email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </FormGroup>

                            <FormGroup controlId='password'>
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Wprowadz hasło'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </Form.Control>
                            </FormGroup>

                            <FormGroup controlId='passwordConfirm'>
                                <Form.Label>Potwierdź hasło</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Potwierdź hasło'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                >
                                </Form.Control>
                            </FormGroup>

                            <Button className='profile-button' type='submit' variant='secondary'>
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col md={9}>
                        <h2>Moje zamówienia</h2>
                    </Col>
                </Row>
            </div>
        <Footer/>
    </div>
  )
}

export default ProfileScreen