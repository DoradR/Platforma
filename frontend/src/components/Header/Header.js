import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import logo from './logo.png'
import './Header.css'
import { FaUserCircle } from 'react-icons/fa'
import { BsCartFill } from 'react-icons/bs'
import { logout } from '../../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const{userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
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

                <LinkContainer to='/about'>
                  <Nav.Link>O NAS</Nav.Link>
                </LinkContainer>
                <NavDropdown title="OFERTA" id="basic-nav-dropdown">
                  <LinkContainer to='/diet'>
                    <NavDropdown.Item>DIETETYKA WETERYNARYJNA</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/curses'>
                    <NavDropdown.Item>SZKOŁA I KURSY</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/behaviorist'>
                    <NavDropdown.Item>BEHAWIORYSTYKA</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Divider />

                  <LinkContainer to='/pricing'> 
                    <NavDropdown.Item>CENNIK</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                <LinkContainer to='/blog'>
                  <Nav.Link>BLOG</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/shop'>
                  <Nav.Link>SKLEP</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/contact'>
                  <Nav.Link>KONTAKT</Nav.Link>
                </LinkContainer>
                <NavDropdown title="WIĘCEJ" id="basic-nav-dropdown">
                  <LinkContainer to='/partners'>
                    <NavDropdown.Item>PARTNERZY</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
                </Nav>
                <Nav>
                <LinkContainer to='/cart'>
                  <Nav.Link><BsCartFill/> KOSZYK</Nav.Link>
                </LinkContainer>

                {userInfo ? (
                  <NavDropdown title={(userInfo.first_name && userInfo.last_name) ? userInfo.name : userInfo.username} id='username' style={{textTransform:'uppercase'}} drop={'start'}>

                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profil</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                  </NavDropdown>
                ): (
                  <LinkContainer to='/login'>
                    <Nav.Link><FaUserCircle/> ZALOGUJ SIĘ</Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Header