import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavbarBrand, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import logo from './logo.png'
import './Header.css'
import { FaUser } from 'react-icons/fa'
import { BsCartFill } from 'react-icons/bs'
import { RiAdminFill } from 'react-icons/ri'
import { logout } from '../../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const{userInfo} = userLogin

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>

            <LinkContainer to='/'>
              <Navbar.Brand><img src={logo} alt="Logo strony"/></Navbar.Brand>
            </LinkContainer>


            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">

                <LinkContainer to='/'>
                  <Nav.Link>STRONA GŁÓWNA</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/shop'>
                  <Nav.Link>SKLEP</Nav.Link>
                </LinkContainer>

                </Nav>
                <Nav style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title={(<NavbarBrand style={{fontSize: '2rem', textTransform: 'uppercase'}}><RiAdminFill/>Admin</NavbarBrand>)} id='adminmenu' style={{display: 'flex', alignItems: 'center',fontSize:'2rem'}} drop={'start'}>

                    <LinkContainer to='/admin/articlelist'>
                      <NavDropdown.Item>Artykuły</NavDropdown.Item>
                    </LinkContainer>
                    
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Użytkownicy</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Produkty</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Zamówienia</NavDropdown.Item>
                    </LinkContainer>

                  </NavDropdown>
                )}

                <LinkContainer to='/cart' style={{fontSize:'2rem'}}>
                  <Nav.Link><BsCartFill/> KOSZYK</Nav.Link>
                </LinkContainer>
                

                {userInfo ? (
                    <NavDropdown title={(<NavbarBrand style={{fontSize: '2rem', textTransform: 'uppercase'}}><FaUser/>DR</NavbarBrand>)} id='username' style={{fontSize:'2rem'}} drop={'start'}>


                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profil</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                  </NavDropdown>
                ): (
                  <LinkContainer to='/login'>
                    <Nav.Link><FaUser style={{fontSize:'2.5rem'}}/> ZALOGUJ SIĘ</Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Header