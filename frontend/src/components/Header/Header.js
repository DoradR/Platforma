import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
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

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title={(<RiAdminFill/>)} id='adminmenu' style={{textTransform:'uppercase', fontSize:'2.5rem'}} drop={'start'}>

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

                <LinkContainer to='/cart' style={{display: 'flex', alignItems: 'center'}}>
                  <Nav.Link><BsCartFill style={{fontSize:'2.5rem'}}/></Nav.Link>
                </LinkContainer>
                

                {userInfo ? (
                  <NavDropdown title={(<FaUser/>)} id='username' style={{textTransform:'uppercase', fontSize:'2.5rem'}} drop={'start'}>

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