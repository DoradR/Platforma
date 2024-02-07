import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'

import LoginScreen from './screens/login/LoginScreen'
import RegisterScreen from './screens/login/RegisterScreen'
import ResetPasswordScreen from './screens/login/ResetPasswordScreen'
import ResetPasswordConfirmScreen from './screens/login/ResetPasswordConfirmScreen'

import ProfileScreen from './screens/ProfileScreen'

import ShopScreen from './screens/ShopScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceorderScreen from './screens/PlaceorderScreen'
import OrderScreen from './screens/OrderScreen'

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
            
            <Route path='/profile' element={<ProfileScreen/>}/>

            <Route path='/shop' element={<ShopScreen/>} exact/>
            <Route path='/product/:id' element={<ProductScreen/>}/>
            <Route path='/cart' element={<CartScreen/>}/>
            <Route path='/cart/:id' element={<CartScreen/>}/>
            <Route path='/shipping' element={<ShippingScreen/>}/>
            <Route path='/payment' element={<PaymentScreen/>}/>
            <Route path='/placeorder' element={<PlaceorderScreen/>}/>
            <Route path='/order/:id' element={<OrderScreen/>}/>
          </Routes>
        </Container>

      </main>
    </BrowserRouter>
  );
}

export default App;
