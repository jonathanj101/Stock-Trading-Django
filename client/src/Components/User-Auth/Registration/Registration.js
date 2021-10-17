import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AlertMsgComponent from '../../AlertMesgComponent';

const FormComponent = ({ handleRegister }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [showAlertMessageComponent, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [validated, setValidated] = useState(false);

    let history = useHistory();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            handleRegistrantData(
                firstName,
                lastName,
                password,
                username,
                email,
            );
            clearForm();
        }
    };

    const clearForm = () => {
        setFirstName('');
        setLastName('');
        setPassword('');
        setUsername('');
        setEmail('');
    };

    const redirectToAccountPage = (username) => {
        setTimeout(() => {
            handleRegister(username);
            history.push('/');
        }, 3000);
    };

    const handleRegistrantData = async (
        firstName,
        lastName,
        password,
        username,
        email,
    ) => {
        try {
            const response = await axios.put(
                'http://127.0.0.1:8000/api/signup',
                {
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    username: username,
                    email: email,
                    userHoldings: 100000,
                },
            );
            setShow(true);
            const statusCode = response.data.status_code;
            const message = response.data.message;

            if (statusCode <= 201) {
                await axios.post('http://127.0.0.1:8000/api/signup', {
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    username: username,
                    email: email,
                    userHoldings: 100000,
                });
                localStorage.setItem('username', JSON.stringify(username));
                setSuccessMessage(message);
                redirectToAccountPage(username);
            } else {
                setErrorMessage(message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <AlertMsgComponent
                setShow={setShow}
                show={showAlertMessageComponent}
                errorMessage={errorMessage}
                successMessage={successMessage}
            />
            <div style={{ margin: '10% auto' }}>
                <Form
                    id="registration-form"
                    noValidate
                    validated={validated}
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                    method="POST"
                    style={{
                        width: '50%',
                        margin: 'auto',
                        textAlign: 'center',
                        boxShadow: 'rgb(179 178 178) 6px 32px 144px',
                    }}
                >
                    <div
                        id="registration-form-title-container"
                        style={{ margin: '25px' }}
                    >
                        <p
                            style={{ fontSize: '2rem', margin: 'auto' }}
                            id="registration-form-title"
                        >
                            Create an account
                        </p>
                    </div>
                    <Form.Row
                        id="form-row"
                        style={{
                            justifyContent: 'space-evenly',
                            margin: 'auto',
                        }}
                    >
                        <Form.Group
                            controlId="firstName"
                            style={{ padding: '2% 0' }}
                        >
                            <Form.Control
                                required
                                htmlSize="50"
                                style={{ padding: '2% 0' }}
                                type="text"
                                placeholder="First name"
                                onChange={(e) => setFirstName(e.target.value)}
                                name="firstName"
                                value={firstName}
                            />
                            <Form.Control.Feedback>
                                Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please type in your First Name!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            controlId="lastName"
                            style={{ padding: '2% 0' }}
                        >
                            <Form.Control
                                required
                                style={{ padding: '2% 0' }}
                                htmlSize="50"
                                type="text"
                                placeholder="Last name"
                                onChange={(e) => setLastName(e.target.value)}
                                name="lastName"
                                value={lastName}
                            />
                            <Form.Control.Feedback>
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please type in your Last Name!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row
                        id="form-row-email"
                        style={{ margin: 'auto', justifyContent: 'center' }}
                    >
                        <Form.Group
                            className="email"
                            controlId="email"
                            style={{ padding: '2% 0' }}
                        >
                            <Form.Control
                                required
                                style={{ padding: '1% 0' }}
                                htmlSize="115"
                                type="email"
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                value={email}
                            />
                            <Form.Control.Feedback>
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid E-mail!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row
                        id="form-row"
                        style={{
                            margin: 'auto',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Form.Group
                            controlId="username"
                            style={{ padding: '2% 0' }}
                        >
                            <Form.Control
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ padding: '2% 0' }}
                                htmlSize="50"
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                required
                            />
                            <Form.Control.Feedback>
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            controlId="password"
                            style={{ padding: '2% 0' }}
                        >
                            <Form.Control
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ padding: '2% 0' }}
                                htmlSize="50"
                                name="password"
                                value={password}
                                type="password"
                                placeholder="Password"
                                required
                            />
                            <Form.Control.Feedback>
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please choose a Password!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <div style={{ margin: '5% auto' }}>
                        <Button
                            id="submit-registration-btn"
                            type="submit"
                            block
                            style={{ width: '50%', margin: 'auto' }}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default FormComponent;
