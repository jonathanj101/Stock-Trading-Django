import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AlertMsgComponent from "../../AlertMesgComponent";

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
        }
    };

    const clearForm = () => {
        setFirstName('');
        setLastName('');
        setPassword('');
        setUsername('');
        setEmail('');
    };

    const redirectToAccountPage = (userId, username) => {
        setTimeout(() => {
            handleRegister(userId, username);
            history.push('/my-stocks');
            clearForm();
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
            const response = await axios.post('/signup', {
                first_name: firstName,
                last_name: lastName,
                password: password,
                username: username,
                email: email,
                userHoldings: 100000,
            });
            setShow(true);
            const message = response.data[0];
            const statusCode = response.data[1];
            const responseUserId = response.data[2];
            const responseUsername = response.data[3];

            if (statusCode >= 500) {
                setErrorMessage(message);
            } else {
                localStorage.setItem('userId', JSON.stringify(responseUserId));
                setSuccessMessage(message);
                redirectToAccountPage(responseUserId, responseUsername);
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
            <div>
                <Form
                    id="registration-form"
                    noValidate
                    validated={validated}
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                    method="POST"

                >
                    <div
                        id="registration-form-title-container"

                    >
                        <span
                            id="registration-form-title"

                        >
                            Create an account
                        </span>
                    </div>
                    <Form.Row id="form-row">
                        <Form.Group
                            controlId="firstName"
                        >
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                onChange={(e) => setFirstName(e.target.value)}
                                name="firstName"
                                value={firstName}

                            />
                            <Form.Control.Feedback

                            >
                                Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback
                                type="invalid"

                            >
                                Please type in your First Name!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            controlId="lastName"

                        >
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                onChange={(e) => setLastName(e.target.value)}
                                name="lastName"
                                value={lastName}
                            />
                            <Form.Control.Feedback

                            >
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback
                                type="invalid"

                            >
                                Please type in your Last Name!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row id="form-row-email" >
                        <Form.Group
                            className="email"
                            controlId="email"

                            as={Col}
                            sm="12"
                            md="12"
                        >
                            <Form.Control
                                required
                                type="email"
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                value={email}

                            />
                            <Form.Control.Feedback

                            >
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback
                                type="invalid"

                            >
                                Please enter a valid E-mail!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row id="form-row" >
                        <Form.Group
                            controlId="username"
                        >
                            <Form.Control
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                required

                            />
                            <Form.Control.Feedback

                            >
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback
                                type="invalid"

                            >
                                Please choose a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
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
                            <Form.Control.Feedback

                            >
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback
                                type="invalid"

                            >
                                Please choose a Password!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <div >
                        <Button
                            id="submit-registration"
                            type="submit"

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
