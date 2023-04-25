import './App.css';
import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import Login from './screens/login/Login'
import Register from './screens/login/Register'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Container>
          <Routes>
            <Route path='/home' element={<HomeScreen/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
