import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'

import LoginScreen from './screens/login/LoginScreen'
import RegisterScreen from './screens/login/RegisterScreen'
import ResetPasswordScreen from './screens/login/ResetPasswordScreen'
import ResetPasswordConfirmScreen from './screens/login/ResetPasswordConfirmScreen'

import ShopScreen from './screens/ShopScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Container className='app-container'>
          <Routes>
            <Route path='/' element={<HomeScreen/>} exact/>
            <Route path='/login' element={<LoginScreen/>}/>
            <Route path='/register' element={<RegisterScreen/>}/>
            <Route path='/reset-password' element = {<ResetPasswordScreen/>}/>
            <Route path='/reset-password-confirm/:id/:token' element = {<ResetPasswordConfirmScreen/>}/>

            <Route path='/shop' element={<ShopScreen/>} exact/>
            <Route path='/product/:id' element={<ProductScreen/>}/>
            <Route path='/cart' element={<CartScreen/>}/>
            <Route path='/cart/:id' element={<CartScreen/>}/>
          </Routes>
        </Container>

      </main>
    </BrowserRouter>
  );
}

export default App;
