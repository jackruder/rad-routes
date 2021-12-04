import React from "react";
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function RadNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="md" sticky="top">
      <Container>
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
          </Nav>
          <Nav className="justify-content-end" style={{width: '100%'}}>
            <Nav.Link onClick={() => navigate("/signup")}>Sign Up</Nav.Link>
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
