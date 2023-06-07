import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import logo from './logo.png'
import './Header.css'
import { FiLogIn } from 'react-icons/fi'

function Header() {
  return (
    <Navbar bg="light" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="#home"><img src={logo} alt="Logo strony"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" >STRONA GŁÓWNA</Nav.Link>
            <Nav.Link href="#link">O NAS</Nav.Link>
            <NavDropdown title="OFERTA" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">DIETETYKA WETERYNARYJNA</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">SZKOŁA I KURSY</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">BEHAWIORYSTYKA</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">CENNIK</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#blog">BLOG</Nav.Link>
            <Nav.Link href="#sklep">SKLEP</Nav.Link>
            <Nav.Link href="#kontakt">KONTAKT</Nav.Link>
            <NavDropdown title="WIĘCEJ" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">PARTNERZY</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Action 2</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Action 3</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="login"><FiLogIn/> ZALOGUJ SIĘ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header