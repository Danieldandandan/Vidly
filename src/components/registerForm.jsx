import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";

class Register extends Form {
  state = {
    data: { username: "", password: "", realname: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).max(20).required().label("Password"),
    realname: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 mx-auto">
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("realname", "Name")}
              {this.renderButton("Register")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
