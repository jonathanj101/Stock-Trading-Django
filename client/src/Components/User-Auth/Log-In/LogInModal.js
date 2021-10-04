import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import AlertMsgComponent from '../../AlertMesgComponent';

const LogInModal = ({ show, handleClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validate, setValidate] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showAlertMsgComponent, setShowAlertMsg] = useState(false);

    let history = useHistory();

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidate(true);
        } else {
            // handleLogInRequest(username, password);
        }
    };

    const clearForm = () => {
        setUsername('');
        setPassword('');
        setErrorMessage('');
        setSuccessMessage('');
        setShowAlertMsg(false);
    };

    const redirectToAccountPage = () => {
        setTimeout(() => {
            clearForm();
            // handleLogIn(usersId, responseDataUsername);
            history.push('/my-stocks');
        }, 2500);
    };

    const handleLogInRequest = async (username, password) => {
        debugger;
        const response = await axios.post('/login', {
            username: username,
            password: password,
        });
        const message = response.data[0];
        const responseStatusCode = response.data[1];
        const userId = response.data[2];
        const responseUsername = response.data[3];
        setShowAlertMsg(true);
        if (responseStatusCode >= 500) {
            setErrorMessage(message);
        } else {
            setSuccessMessage(message);
            redirectToAccountPage(userId, responseUsername);
            // localStorage.setItem('userId', JSON.stringify(userId));
        }
    };

    return (
        <div id="log-in-modal">
            <Modal show={show} onHide={handleClose} centered size='lg' aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header>
                    <Modal.Title>
                        Log In
                    </Modal.Title>
                </Modal.Header>

                <Form
                    id="log-in-form"
                    noValidate
                    validated={validate}
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                    method="POST"
                >
                    <AlertMsgComponent
                        errorMessage={errorMessage}
                        successMessage={successMessage}
                        show={showAlertMsgComponent}
                    />
                    <Form.Text>
                        Sign In to your account
                    </Form.Text>
                    <Form.Group controlId="email">
                        <Form.Control
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            name="Username"
                            type="text"
                            value={username}
                            placeholder="Enter Username"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please type in your username!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Control
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            value={password}
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please type in your password!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        id="log-in-btn"
                        type="submit"
                        className="mb-auto"
                        variant="primary"
                        size="lg"
                        block
                    >
                        Log In
                    </Button>
                    <div className="mt-5 d-flex ">
                        <p>Don't have an account?</p>
                        <Link onClick={handleClose} className="ml-3" to="/register">
                            Register here
                        </Link>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default LogInModal;
