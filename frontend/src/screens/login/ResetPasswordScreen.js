import React, {useState, useEffect} from 'react'
import './Login.css'
import { FaEnvelope } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../actions/userActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

function ResetPasswordScreen() {
    const [email, setEmail] = useState("")
    const [requestSent, setRequestSent] = useState(false)

    const dispatch = useDispatch()

    const userResetPassword = useSelector((state) => state.userResetPassword);
    const { loading, error } = userResetPassword;

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("Submit handler called with email:", email)
        dispatch(resetPassword(email))
        setRequestSent(true)
    }

  return (
    <div className='container'>
        <main className="body-login">
            <section className="login-section">
                <div className="login-form-box">
                    <div className="login-form-value">
                        <form className="login-form-signin" onSubmit={submitHandler}>
                            <h2>Zresetuj hasło</h2>
                            {error && <Message>{error}</Message>}
                            {requestSent && <Message>Link do resetowania hasła został wysłany na podany adres email.</Message>}
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

                            <button className="login-button" type='submit'>Zresetuj hasło</button>
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

export default ResetPasswordScreen