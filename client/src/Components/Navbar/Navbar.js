import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

const Navigation = ({ isLogged }) => {

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#about">About</Nav.Link>
                            {isLogged
                                ? <div>
                                    <Nav.Link href="#summary">Summary</Nav.Link>
                                    <Nav.Link href="#account">Account</Nav.Link></div>
                                : <div>
                                    <Nav.Link>Log In</Nav.Link>
                                </div>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;
