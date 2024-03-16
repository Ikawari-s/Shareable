import React, { useState } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import '../designs/GuestHeader.css';
import logotext from '../designs/logotext.png';



function GuestHeader({ scrollToSpecificHeight }) {
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

  const scrollToLogInPage = () => {
    const LogInPage = document.getElementById("LogInPage");
    if (LogInPage) {
      LogInPage.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToFindSharer = () => {
    const FindSharer = document.getElementById("FindSharer");
    if (FindSharer) {
      FindSharer.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToSignUpPage = () => {
    const SignUpPage = document.getElementById("SignUpPage");
    if (SignUpPage) {
      SignUpPage.scrollIntoView({ behavior: 'smooth' });
    }
  }; 

  
  return (
    <>
      <header id="bodhi" className={isScrolled ? 'bodhi circular' : 'bodhi'}>
          <nav className="d-flex justify-content-center">
              <img src={logotext} alt="Logo" id='logotext' />
            <Nav.Link className="d-flex justify-content-center yea" style={{ color: 'gray', fontWeight: '', paddingTop: '1rem', fontWeight: '600'}} onClick={scrollToFindSharer}>FIND A SHARER</Nav.Link>
            <Nav.Link className="d-flex justify-content-center yea" style={{ color: 'gray', fontWeight: '', paddingTop: '1rem', fontWeight: '600'}} onClick={scrollToLogInPage}>LOG IN</Nav.Link>
            {/* <Nav.Link className="d-flex justify-content-center" style={{ color: 'gray', fontWeight: '', paddingTop: '1rem', fontWeight: '600'}} as={Link} to="/login">LOG IN</Nav.Link> */}
            <Nav.Link className="d-flex justify-content-center yea" style={{ color: 'gray', fontWeight: '', paddingTop: '1rem', fontWeight: '600'}} onClick={scrollToSignUpPage}>SIGN UP</Nav.Link>
            {/* <Nav.Link className="d-flex justify-content-center" style={{ color: 'gray', fontWeight: '', paddingTop: '1rem', fontWeight: '600'}} as={Link} to="/signup">SIGN UP</Nav.Link> */}
          </nav>

      </header>
    </>
  );
}

export default GuestHeader;