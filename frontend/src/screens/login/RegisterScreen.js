import React, {useState, useEffect} from 'react'
import './Login.css'
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'


function RegisterScreen() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [passwordIsValid, setPasswordIsValid] = useState(false)

    const dispatch = useDispatch()

    let location = useLocation()
    let navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    const hasLowerCase = /[a-z]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasDigit = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    const validatePassword = (password) => {
        const isValid =
            password.length >= 10 &&
            hasLowerCase &&
            hasUpperCase &&
            hasDigit &&
            hasSpecialChar

        setPasswordIsValid(isValid)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Hasła nie są takie same')
        } else {
            dispatch(register(username, email, password))
        }
    }

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const getClassForValidation = (isValid) => {
        return isValid ? 'password-validation-good' : 'password-validation-info';
    }
  return (
    <div className='container'>
        <main className="body-login">
            <section className="login-section">
                <div className="login-form-box-register">
                    <div className="login-form-value">
                        <form className="login-form-signin" onSubmit={submitHandler}>
                            <h2>Zarejestruj się</h2>
                            {message && <Message>{message}</Message>}
                            {error && <Message>{error}</Message>}
                            {loading && <Loader/>}
                            <div className="login-inputbox">
                                <FaUser className='icon'/>
                                <input 
                                    type="username" 
                                    className="form-control" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <label>Nazwa użytkownika</label>
                            </div>

                            <div className="login-inputbox">
                                <FaEnvelope className='icon'/>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label>Email</label>
                            </div>

                            <div className="login-inputbox">
                                <FaLock className='icon'/>
                                <input 
                                    type="password" 
                                    className={`form-control ${passwordIsValid ? 'valid' : 'invalid'}`}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        validatePassword(e.target.value)
                                    }}
                                    required
                                />
                                <label>Hasło</label>
                            </div>  

                            <div className="login-inputbox">
                                <FaLock className='icon'/>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <label>Potwierdź Hasło</label>
                            </div>

                            {!passwordIsValid && (
                                <ul>
                                    <li className={getClassForValidation(password.length >= 10)}>Musi być dłuższe niż 10 znaków</li>
                                    <li className={getClassForValidation(hasLowerCase)}>Musi zawierać małą literę</li>
                                    <li className={getClassForValidation(hasUpperCase)}>Musi zawierać dużą literę</li>
                                    <li className={getClassForValidation(hasDigit)}>Musi zawierać cyfrę</li>
                                    <li className={getClassForValidation(hasSpecialChar)}>Musi zawierać znak specjalny</li>
                                </ul>
                            )}

                            <button className="login-button" type='submit'>Zarejestruj się</button>

                            <div className="login-second-option">
                                <p>Posiadasz już konto <Link to={redirect ? `/login?redirect=${redirect}` : 'login'}>Zaloguj się</Link></p>
                            </div>
                        </form>
                    </div>
                </div>

            </section>
        </main>
    </div>
  )
}

export default RegisterScreen