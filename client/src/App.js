import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Navigation from './Components/Navbar/Navbar';
import Home from './Components/Pages/Home';
import PageNotFound from './Components/PageNotFound';
import Registration from './Components/User-Auth/Registration/Registration';
import Footer from './Components/Footer';
import About from './Components/Pages/About';
import Summary from './Components/Pages/Summary';
import ProtectRoute from './Components/ProtectRoute';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userHoldings: '',
            isLogged: false,
        };
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
    }

    async componentDidMount() {
        const localStorageUsername = JSON.parse(
            localStorage.getItem('username'),
        );
        if (localStorageUsername !== null) {
            const response = await axios
                .put('http://127.0.0.1:8000/api/user', {
                    username: localStorageUsername,
                })
                .then((data) => {
                    return data.data;
                });
            this.setState({
                username: response.username,
                userHoldings: response.user_holdings,
                isLogged: true,
            });
        } else {
            return;
        }
    }

    // async componentDidUpdate(prevProps, prevState) {
    //     const localStorageUsername = JSON.parse(localStorage.getItem('userId'));
    //     if (this.state.userHoldings !== prevState.userHoldings) {
    //         const response = await axios
    //             .post('/user', {
    //                 id: localStorageUsername,
    //             })
    //             .then((data) => {
    //                 return data.data;
    //             });
    //         this.setState({
    //             id: localStorageUsername,
    //             username: response.username,
    //             userHoldings: response.user_holdings,
    //         });
    //     }
    // }

    isUserAuthenticated = () => {
        const localStorageUsername = JSON.parse(
            localStorage.getItem('username'),
        );
        if (localStorageUsername !== null) {
            return true;
        } else {
            return false;
        }
    };

    handleRegister = (username) => {
        if (username !== undefined) {
            this.setState({
                userHoldings: 100000,
                username: username,
                isLogged: true,
            });
        } else {
            return;
        }
    };

    handleLogIn = (username) => {
        // debugger;
        if (username) {
            localStorage.setItem('username', JSON.stringify(username));
            this.setState({
                username: username,
                isLogged: true,
            });
        }
        return;
    };

    handleLogOut = () => {
        this.setState({
            username: '',
            isLogged: false,
        });
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navigation
                        isLogged={this.state.isLogged}
                        handleLogIn={this.handleLogIn}
                    />
                    <Switch>
                        <Route path="/" exact render={() => <Home />} />
                        <Route path="/about" exact render={() => <About />} />
                        {/* <Route
                            path="/summary"
                            exact
                            render={() => <Summary />}
                        /> */}
                        <ProtectRoute
                            exact
                            path="/summary"
                            isUserAuthenticated={this.isUserAuthenticated()}
                            component={() => <Summary />}
                        />
                        <Route
                            path="/register"
                            exact
                            render={() => (
                                <Registration
                                    handleRegister={this.handleRegister}
                                />
                            )}
                        />
                        <Route path="*" component={() => <PageNotFound />} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
