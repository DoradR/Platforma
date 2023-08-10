import React, {useState, useEffect} from 'react'
import './Login.css'
import { Link, useParams } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordConfirm } from '../../actions/userActions'

import Loader from '../../components/Loader'
import Message from '../../components/Message'

function ResetPasswordConfirmScreen() {
    const [newPassword, setNewPassword] = useState("")
    const [reNewPassword, setReNewPassword] = useState("")
    const [message, setMessage] = useState("")
    const [passwordIsValid, setPasswordIsValid] = useState(false)

    const dispatch = useDispatch()

    const userResetPasswordConfirm = useSelector((state) => state.userResetPasswordConfirm);
    const { loading, error, success } = userResetPasswordConfirm;

    const {id} = useParams()
    const {token} = useParams()

    const validatePassword = (newPassword) => {
        const hasLowerCase = /[a-z]/.test(newPassword)
        const hasUpperCase = /[A-Z]/.test(newPassword)
        const hasDigit = /\d/.test(newPassword)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)

        const isValid =
            newPassword.length >= 10 &&
            hasLowerCase &&
            hasUpperCase &&
            hasDigit &&
            hasSpecialChar

        setPasswordIsValid(isValid)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if(newPassword !== reNewPassword){
            setMessage('Hasła nie są takie same')
        } else {
            dispatch(resetPasswordConfirm(id, token, newPassword, reNewPassword))
        }
    }

  return (
    <div className='container'>
        <main className="body-login">
            <section className="login-section">
                <div className="login-form-box">
                    <div className="login-form-value">
                        <form className="login-form-signin" onSubmit={submitHandler}>
                            <h2>Zresetuj hasło</h2>
                            {message && <Message>{message}</Message>}
                            {success && <Message variant='info'>Hasło zostało pomyślnie zmienione</Message>}
                            {error && <Message>{error}</Message>}
                            {loading && <Loader/>}
                            <div className="login-inputbox">
                                <FaLock className='icon'/>
                                <input 
                                    type="password" 
                                    className={`form-control ${passwordIsValid ? 'valid' : 'invalid'}`}
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value)
                                        validatePassword(e.target.value)
                                    }}
                                    required
                                />
                                <label htmlFor="">Hasło</label>
                            </div>

                            <div className="login-inputbox">
                                <FaLock className='icon'/>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={reNewPassword}
                                    onChange={(e) => setReNewPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="">Potwierdź Hasło</label>
                            </div>

                            {!passwordIsValid && (
                                <p className="password-validation-info">
                                    Hasło musi zawierać co najmniej 10 znaków, w tym małą i dużą literę, cyfrę oraz znak specjalny.
                                </p>
                            )}

                            <button className="login-button" type='submit'>Ustaw nowe hasło</button>
                            <div className="login-second-option">
                                <p><Link to='/login'>Zaloguj się</Link></p>
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

export default ResetPasswordConfirmScreen