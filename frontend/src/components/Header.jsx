import React from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'

function Header() {
  return (
    <>
      <Navbar expand="lg" bg='primary' variant='dark' collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#/cart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            <Nav.Link href="#/user"><i className='fas fa-user'></i>User</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header