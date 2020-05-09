import React, { useState } from "react";
import { connect } from "react-redux";
import { loginSkater } from "../store/authentication";

const LoginPanel = (props) => {
  const [ username, setUsername ] = useState("crookiemonster");
  const [ password, setPassword ] = useState("password");

  const handleSetUsername = (e) => setUsername(e.tartget.value);
  const handleSetPassword = (e) => setPassword(e.tartget.value);
  const handleLogin = (e) => {
    e.preventDefault();
    this.props.loginSkater(username, password);
  }

  if (props.token) {
    return <Redirect to="/skatespots" />;
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={handleSetUsername}
        placeholder={Username}
      />
      <input
        type="password"
        value={password}
        onChange={handleSetPassword}
        placeholder={Password}
      />
      <button>Log In</button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    token: state.authentication.token
  };
};

const mapDispathToProps = dispatch => {
  return {
    loginSkater: (username, password) => dispatch(loginSkater(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(
  LoginPanel
);

