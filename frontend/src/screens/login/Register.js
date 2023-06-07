import React from 'react'
import './Login.css'
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa'


function Register() {
  return (
    <div className='container'>
        <main className="body-login">
            <section className="login-section">
                <div className="login-form-box-register">
                    <div className="login-form-value">
                        <form className="login-form-signin" method="post">
                            <h2>Zarejestruj się</h2>
                            <div className="login-inputbox">
                                <FaUser className='icon'/>
                                <input type="nickname" name="nickname" id="inputNickname" className="form-control" required/>
                                <label htmlFor="">Nazwa użytkownika</label>
                            </div>
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
                            <div className="login-inputbox">
                                <FaLock className='icon'/>
                                <input type="password" name="password" id="inputPassword2" className="form-control" required/>
                                <label htmlFor="">Potwierdź hasło</label>
                            </div>
                            <button className="login-button">Zaloguj się</button>
                            <div className="login-second-option">
                                <p>Posiadasz już konto <a href="#">Zaloguj się</a></p>
                            </div>
                        </form>
                    </div>
                </div>

            </section>
        </main>
    </div>
  )
}

export default Register