import React, {useState, useEffect} from 'react'
import { Row, Col, FormGroup, Form, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaX } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile, } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
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
    const [passwordIsValid, setPasswordIsValid] = useState(false)
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()

    let navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const hasLowerCase = /[a-z]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    const submitHandler = (e) => {
        e.preventDefault();
    
        let messageText = '';
        let messageVariant = 'info';
    
        if (password !== confirmPassword) {
            messageText = 'Hasła nie są takie same';
            messageVariant = 'danger';
        } else if (!validatePassword(password)) {
            messageText = 'Hasło jest za słabe. Sprawdź warunki walidacji.';
            messageVariant = 'danger';
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'first_name': firstname,
                'last_name': lastname,
                'email': email,
                'password': password
            }));
            messageText = 'Pomyślnie zaaktualizowano dane użytkownika.';
        }
    
        setMessage({ text: messageText, variant: messageVariant });
        
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    }

    const validatePassword = (password) => {
        const isValid =
            password.length >= 10 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        setPasswordIsValid(isValid);
        return isValid;
    }

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setFirstname(user.first_name)
                setLastname(user.last_name)
                setEmail(user.email)
                setPassword("")
                setConfirmPassword("")
            }
        }
    }, [dispatch, navigate, userInfo, user, success])

    const getClassForValidation = (isValid) => {
        return isValid ? 'password-validation-good' : 'password-validation-info';
    }

  return (
    <div>
        <Header/>
            <div className='p-3'>
                <Row className='shopscreen-row'>
                    <Col md={3}>
                        <h2>Profil użytkownika</h2>
                        {message && <Message variant={message.variant} dismissable>{message.text}</Message>}
                        {error && <Message>{error}</Message>}
                        {loading && <Loader/>}
                        <Form onSubmit={submitHandler} className='list-of-forms-from-profile-screen'>
                            <FormGroup controlId='firstname'>
                                <Form.Label>Imię</Form.Label>
                                <Form.Control
                                    className='form-from-profile-screen'
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
                                    className='form-from-profile-screen'
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
                                    className='form-from-profile-screen'
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
                                    className='form-from-profile-screen'
                                    type='password'
                                    placeholder='Wprowadz hasło'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        validatePassword(e.target.value)
                                    }}
                                >
                                    
                                </Form.Control>
                            </FormGroup>

                            <FormGroup controlId='passwordConfirm' style={{marginBottom: '20px'}}>
                                <Form.Label>Potwierdź hasło</Form.Label>
                                <Form.Control
                                    className='form-from-profile-screen'
                                    type='password'
                                    placeholder='Potwierdź hasło'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                >
                                </Form.Control>
                            </FormGroup>

                            {!passwordIsValid && (
                                <ul>
                                    <li className={getClassForValidation(password.length >= 10)}>Musi być dłuższe niż 10 znaków</li>
                                    <li className={getClassForValidation(hasLowerCase)}>Musi zawierać małą literę</li>
                                    <li className={getClassForValidation(hasUpperCase)}>Musi zawierać dużą literę</li>
                                    <li className={getClassForValidation(hasDigit)}>Musi zawierać cyfrę</li>
                                    <li className={getClassForValidation(hasSpecialChar)}>Musi zawierać znak specjalny</li>
                                </ul>
                            )}

                            <Button className='btn-info' type='submit' variant='secondary'>
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col md={9}>
                        <h2>Moje zamówienia</h2>
                        {loadingOrders ? (
                            <Loader/>
                        ) : errorOrders ? (
                            <Message variant='danger'>{errorOrders}</Message>
                        ) : (
                            <Table
                                striped
                                responsive
                                className='table-sm'
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Dzień</th>
                                        <th>Kwota</th>
                                        <th>Zapłacone</th>
                                        <th>Dostarczone</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.createdAt.substring(0,10)}</td>
                                            <td>{order.totalPrice}zł</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0,10) : (
                                                <FaX style={{'color': 'red'}}/>
                                            )}</td>
                                            <td>{order.isSended ? order.sendedAt.substring(0,10) : (
                                                <FaX style={{'color': 'red'}}/>
                                            )}</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className='btn-info' type='submit' variant='secondary'>Szczegóły</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </div>
        <Footer/>
    </div>
  )
}

export default ProfileScreen