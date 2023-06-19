import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'

import Login from './screens/login/Login'
import Register from './screens/login/Register'

import ShopScreen from './screens/ShopScreen'
import ProductScreen from './screens/ProductScreen'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Container className='app-container'>
          <Routes>
            <Route path='/' element={<HomeScreen/>} exact/>
            <Route path='/login' element={<Login/>} exact/>
            <Route path='/register' element={<Register/>} exact/>

            <Route path='/shop' element={<ShopScreen/>} exact/>
            <Route path='/product/:id' element={<ProductScreen/>}/>
          </Routes>
        </Container>

      </main>
    </BrowserRouter>
  );
}

export default App;
