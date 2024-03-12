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
            <Nav.Link className="d-flex justify-content-center" style={{ color: 'gray', fontWeight: ''}} as={Link} to="/">
              <img src={logotext} alt="Logo" id='logotext' />
            </Nav.Link>
            <Nav.Link className="d-flex justify-content-center" style={{ color: 'gray', fontWeight: '', paddingTop: '1rem', fontWeight: '600'}} as={Link} to="/userprofile">FIND A SHARER</Nav.Link>
            <Nav.Link className="d-flex justify-content-center" style={{ color: 'gray', fontWeight: '', paddingTop: '1rem', fontWeight: '600'}} as={Link} to="/login">LOG IN</Nav.Link>
            <Nav.Link className="d-flex justify-content-center" style={{ color: 'gray', fontWeight: '', paddingTop: '1rem', fontWeight: '600'}} as={Link} to="/signup">SIGN UP</Nav.Link>
          </nav>

      </header>
    </>
  );
}

export default GuestHeader;

 