import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import AlertMsgComponent from '../../AlertMesgComponent';

const LogInModal = ({ show, handleClose, handleLogIn }) => {
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
            handleLogInRequest(username, password);
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
            handleClose();
            handleLogIn(username);
            history.push('/summary');
        }, 2500);
    };

    const handleLogInRequest = async (username, password) => {
        const response = await axios.put('http://127.0.0.1:8000/api/login', {
            username: username,
            password: password,
        });
        const message = response.data.message;
        const responseStatusCode = response.data.status_code;
        setShowAlertMsg(true);
        if (responseStatusCode >= 500) {
            setErrorMessage(message);
        } else {
            setSuccessMessage(message);
            redirectToAccountPage();
        }
    };

    return (
        <div id="log-in-modal">
            <Modal
                show={show}
                onHide={handleClose}
                centered
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header>
                    <Modal.Title
                        style={{ fontSize: '2.75rem', fontWeight: 'bold' }}
                    >
                        Log In
                    </Modal.Title>
                </Modal.Header>

                <Form
                    style={{ width: '50%', margin: 'auto' }}
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
                    <Form.Group
                        style={{ margin: '50px auto' }}
                        controlId="email"
                    >
                        <Form.Control
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            name="Username"
                            type="text"
                            value={username}
                            placeholder="Enter Username"
                        />
                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Please type in your username!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        style={{ margin: '50px auto' }}
                        controlId="password"
                    >
                        <Form.Control
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            value={password}
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <Form.Control.Feedback>
                            Looks good!
                        </Form.Control.Feedback>
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
                        <Link
                            onClick={handleClose}
                            className="ml-3"
                            to="/register"
                        >
                            Register here
                        </Link>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default LogInModal;
