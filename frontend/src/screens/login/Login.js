import React from 'react'
import './Login.css'
import { FaLock, FaEnvelope } from 'react-icons/fa'

function Login() {
  return (
    <div>
        <main className="body-login">
            <section className="login-section">
                <div className="login-form-box">
                    <div className="login-form-value">
                        <form className="login-form-signin" method="post">
                            <h2>Zaloguj się</h2>
                            <div className="login-inputbox">
                                <FaEnvelope className='icon'/>
                                <input type="email" name="email" id="inputEmail" className="form-control" required/>
                                <label htmlFor="">Email</label>
                            </div>
                            <div className="login-inputbox">
                                <FaLock className='icon'/>
                                <input type="password" name="password" id="inputPassword1" className="form-control" required/>
                                <label htmlFor="">Hasło</label>
                            </div>
                            <button className="login-button">Zaloguj się</button>
                            <div className="login-second-option">
                                <p>Nie masz jeszcze konta? <a href="#">Zarejestruj się</a></p>
                            </div>
                            <div className="login-second-option">
                                <p><a href="#">Nie pamiętasz hasła?</a></p>
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

export default Login