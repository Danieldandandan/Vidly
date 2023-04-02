import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Customers from "./components/Customers/customers";
import Rentals from "./components/Rentals/rentals";
import NotFound from "./components/notfound";
import MovieDetail from "./components/Movies/movieDetail";
import MovieBoard from "./components/Movies/moviesBoard";
import LoginForm from "./components/loginForm";
import Register from "./components/registerForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <div className="content">
          <Switch>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies" exact component={MovieBoard} />
            <Route path="/movies/:id" component={MovieDetail} />

            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
