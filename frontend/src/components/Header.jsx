import React from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <>
      <Navbar expand="lg" bg='primary' variant='dark' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/features">Features</Nav.Link>
            <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
            <Nav.Link as={Link} to="/cart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            <Nav.Link as={Link} to="/user"><i className='fas fa-user'></i>User</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header