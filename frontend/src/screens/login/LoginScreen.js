import React, {useState, useEffect} from 'react'
import './Login.css'
import { FaLock, FaEnvelope } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

function LoginScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    let location = useLocation()
    let navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

  return (
    <div className='container'>
        <main className="body-login">
            <section className="login-section">
                <div className="login-form-box">
                    <div className="login-form-value">
                        <form className="login-form-signin" onSubmit={submitHandler}>
                            <h2>Zaloguj się</h2>
                            {error && <Message>{error}</Message>}
                            {loading && <Loader/>}
                            <div className="login-inputbox">
                                <FaEnvelope className='icon'/>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="">Email</label>
                            </div>

                            <div className="login-inputbox">
                                <FaLock className='icon'/>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="">Hasło</label>
                            </div>

                            <button className="login-button" type='submit'>Zaloguj się</button>

                            <div className="login-second-option">
                                <p>Nie masz jeszcze konta? <Link to={redirect ? `/register?redirect=${redirect}` : 'register'}>Zarejestruj się</Link></p>
                            </div>

                            <div className="login-second-option">
                                <p><Link to='#'>Nie pamiętasz hasła?</Link></p>
                            </div>
                        </form>
                    </div>
                </div>

            </section>
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </main>
    </div>
  )
}

export default LoginScreen