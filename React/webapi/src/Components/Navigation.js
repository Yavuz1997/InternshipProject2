import React, { Component } from 'react';
import {Navbar,Nav} from 'react-bootstrap'

export class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark ps-5 pe-5 " expand="lg">
        
        <Navbar.Toggle aria-controls='navbar-collapse'/>
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="d-flex justfity-content-left">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav.Link href="/Department">Department</Nav.Link>
            <Nav.Link href="/Employee">Employee</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
  }
}
