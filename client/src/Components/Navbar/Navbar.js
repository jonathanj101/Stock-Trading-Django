import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Nav, Navbar, Container } from 'react-bootstrap';
import LogInModal from '../User-Auth/Log-In/LogInModal';

const Navigation = ({ isLogged, handleLogIn, handleLogOut }) => {
    const [show, setShow] = useState(false);
    const history = useHistory();

    const handleClose = () => {
        setShow(false);
    };

    return (
        <div>
            <LogInModal
                show={show}
                handleClose={handleClose}
                handleLogIn={handleLogIn}
            />
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Fantasy Stock Trading</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse
                        id="responsive-navbar-nav"
                        style={{ justifyContent: 'center' }}
                    >
                        <Nav className="me-auto">
                            <Nav.Link href="/about">About</Nav.Link>
                            {isLogged ? (
                                <div id="navbar-items">
                                    <Nav.Link href="/summary">Summary</Nav.Link>
                                    <Nav.Link href="/trade">Trade</Nav.Link>
                                </div>
                            ) : (
                                <div>
                                    <Nav.Link onClick={() => setShow(true)}>
                                        Log In
                                    </Nav.Link>
                                </div>
                            )}
                            {isLogged ? (
                                <Nav.Link
                                    onClick={() => {
                                        history.push('/');
                                        handleLogOut();
                                    }}
                                >
                                    Log Out
                                </Nav.Link>
                            ) : (
                                <div></div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;
