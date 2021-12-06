import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function RadNavbar({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(Object.keys(sessionStorage).indexOf("auth_token") >= 0 || Object.keys(localStorage).indexOf("auth_token") >= 0);
  }, [setLoggedIn]);

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top" style={{ minWidth: '100vw', maxWidth: '100vw' }}>
      <Container fluid>
        <Navbar.Brand
          style={{cursor: "pointer"}}
          onClick={() => navigate("/")}
        >
          Rad Routes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/climbs")}>Climbs</Nav.Link>
            <Nav.Link onClick={() => navigate("/edit")}>Create</Nav.Link>
          </Nav>
          <Nav className="justify-content-end" style={{width: '100%'}}>
            { 
              !loggedIn ? <>
                <Nav.Link onClick={() => navigate("/signup")}>Sign Up</Nav.Link>
                <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
              </>
              :
              <NavDropdown menuVariant="dark" title={localStorage.username} id="user-dropdown">
                <Nav.Link
                  onClick={() => {
                    for(let item of ["username", "auth_token"]){
                      localStorage.removeItem(item);
                      sessionStorage.removeItem(item);
                    }
                    setLoggedIn(false);
                    window.location.reload();
                  }}
                >
                  Logout
                </Nav.Link>
              </NavDropdown>
            }
            <div style={{minWidth: 100}}></div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
