import React, { useState } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import '../designs/GuestHeader.css';
import logotext from '../designs/logotext.png';




function GuestHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate() 
  
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>
      <header id="bodhi" className={isScrolled ? 'bodhi circular' : 'bodhi'}>
          <nav className="d-flex justify-content-center">
            <Nav.Link style={{ color: 'gray', fontWeight: ''}} as={Link} to="/">
              <img src={logotext} alt="Logo" />
            </Nav.Link>
            <Nav.Link style={{ color: 'gray', fontWeight: '', padding: 'none' }} as={Link} to="/userprofile">FIND A SHARER</Nav.Link>
            <Nav.Link style={{ color: 'gray', fontWeight: ''}} as={Link} to="/login">LOG IN</Nav.Link>
            <Nav.Link style={{ color: 'gray', fontWeight: ''}} as={Link} to="/signup">SIGN UP (going insane)</Nav.Link>
          </nav>

      </header>
    </>
  );
}

export default GuestHeader;

 