import React, { Component } from 'react';
import {Navbar,Nav} from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';

export class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark ps-5 pe-5 " expand="lg">

        <Navbar.Toggle aria-controls='navbar-collapse'/>
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="d-flex justfity-content-left">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Employee Management"
              menuVariant="dark"
            >
              <NavDropdown.Item href="/Employee">Employees</NavDropdown.Item>
              <NavDropdown.Item href="/Manager">Managers</NavDropdown.Item>
            </NavDropdown>

            {/* 
            <Nav.Link href="/Manager">Managers</Nav.Link>
            <Nav.Link href="/Employee">Employees</Nav.Link> */} 
            <Nav.Link href="/Department">Departments</Nav.Link>

          </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
  }
}
