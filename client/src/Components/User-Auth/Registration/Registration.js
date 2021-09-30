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
            <div style={{ border: "2px solid red", margin: "10% auto" }}>
                <Form
                    id="registration-form"
                    noValidate
                    validated={validated}
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                    method="POST"
                    style={{ border: "2px solid black", width: "50%", margin: "auto", textAlign: "center" }}

                >
                    <div
                        id="registration-form-title-container"
                        style={{ margin: "25px" }}

                    >
                        <p
                            style={{ fontSize: "2rem", width: "fit-content", margin: "auto", borderBottom: "3px solid lightblue" }}
                            id="registration-form-title"

                        >
                            Create an account
                        </p>
                    </div>
                    <Form.Row id="form-row" style={{ justifyContent: "space-evenly", border: "2px solid red", margin: "auto" }}>
                        <Form.Group
                            controlId="firstName"
                            style={{ padding: "2% 0" }}
                        >
                            <Form.Control
                                required
                                htmlSize="50"
                                style={{ padding: "2% 0" }}
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
                            style={{ padding: "2% 0" }}

                        >
                            <Form.Control
                                required
                                style={{ padding: "2% 0" }}
                                htmlSize="50"
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
                    <Form.Row id="form-row-email" style={{ border: "2px solid purple", margin: "auto", justifyContent: "center" }} >
                        <Form.Group
                            className="email"
                            controlId="email"
                            style={{ padding: "2% 0" }}
                        >
                            <Form.Control
                                required
                                style={{ padding: "1% 0" }}
                                htmlSize="115"
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
                    <Form.Row id="form-row" style={{ border: "2px solid red", margin: "auto", justifyContent: "space-evenly" }} >
                        <Form.Group
                            controlId="username"
                            style={{ padding: "2% 0" }}
                        >
                            <Form.Control
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ padding: "2% 0" }}
                                htmlSize="50"
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
                            style={{ padding: "2% 0" }}

                        >
                            <Form.Control
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ padding: "2% 0" }}
                                htmlSize="50"
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
                    <div style={{ margin: "5% auto" }}>
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
