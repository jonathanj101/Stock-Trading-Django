import React, { Component } from "react"
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Navigation from "./Components/Navbar/Navbar";
import Home from "./Components/Pages/Home";
import PageNotFound from "./Components/PageNotFound";
import Registration from "./Components/User-Auth/Registration/Registration"
import Footer from "./Components/Footer";
import SearchComponent from "./Components/Search-Component/SearchComponent";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      userId: '',
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
    const localStorageUserId = JSON.parse(localStorage.getItem('userId'));
    if (localStorageUserId !== null) {
      return true;
    } else {
      return false;
    }
  };

  handleRegister = (userId, username) => {
    if (userId !== undefined) {
      this.setState({
        userId: userId,
        userHoldings: 100000,
        username: username,
        isLogged: true,
      });
    } else {
      return;
    }
  };

  handleLogIn = (userId, username) => {
    debugger;
    if (userId) {
      localStorage.setItem('userId', JSON.stringify(userId));
      this.setState({
        userId: userId,
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
          <SearchComponent />
          <Switch>
            <Route path="/" exact render={() => { <Home /> }} />
            <Route path="/register" exact render={() => <Registration />} />
            <Route path="*" component={() => <PageNotFound />} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
