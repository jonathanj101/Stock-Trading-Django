import React, { Component } from "react"
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Navigation from "./Components/Navbar/Navbar";
import Home from "./Components/Pages/Home";
import PageNotFound from "./Components/PageNotFound";
import Registration from "./Components/User-Auth/Registration/Registration"
import Footer from "./Components/Footer";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      userHoldings: '',
      isLogged: false
    }
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
  }

  //   async componentDidMount() {
  //     const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
  //     if (localStorageUserId !== null) {
  //         const response = await axios
  //             .post('/user', {
  //                 id: localStorageUserId,
  //             })
  //             .then((data) => {
  //                 return data.data;
  //             });
  //         this.setState({
  //             userId: localStorageUserId,
  //             username: response.username,
  //             userHoldings: response.user_holdings,
  //             isLogged: true,
  //         });
  //     } else {
  //         return;
  //     }
  // }

  // async componentDidUpdate(prevProps, prevState) {
  //     const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
  //     if (this.state.userHoldings !== prevState.userHoldings) {
  //         const response = await axios
  //             .post('/user', {
  //                 id: localStorageUserId,
  //             })
  //             .then((data) => {
  //                 return data.data;
  //             });
  //         this.setState({
  //             id: localStorageUserId,
  //             username: response.username,
  //             userHoldings: response.user_holdings,
  //         });
  //     }
  // }

  isUserAuthenticated = () => {
    const localStorageUserId = JSON.parse(localStorage.getItem('username'));
    if (localStorageUserId !== null) {
      return true;
    } else {
      return false;
    }
  };

  handleRegister = (username) => {
    debugger
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
    debugger;
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
      <BrowserRouter >
        <div className="App" >
          <Navigation isLogged={this.state.isLogged} />
          <Switch>
            <Route path="/" exact render={() => <Home /> } />
            <Route path="/register" exact render={() => <Registration handleRegister={this.handleRegister} />} />
            <Route path="*" component={() => <PageNotFound />} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
