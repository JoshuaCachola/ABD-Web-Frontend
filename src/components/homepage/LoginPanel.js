import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/authentication";
// import logo from "../../images/abd-logo.png";

const LoginPanel = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("crookiemonster");
  const [password, setPassword] = useState("verygoodpassword");

  // if (!!props.needLogin) {
  //   // return <Redirect push to="/skatespots" />
  //   history.push("/skatespots");
  // }

  const handleSetUsername = (e) => setUsername(e.tartget.value);
  const handleSetPassword = (e) => setPassword(e.tartget.value);
  const handleLogin = (e) => {
    e.preventDefault();
    props.login(username, password);
    history.push("/skatespots");
    // return <Redirect push to="/skatespots" />
  };

  // if (props.token) {
  //   return <Redirect to="/skatespots" />;
  // }
  return (
    <div className="homepage__login-form">
      <div className="homepage__logo">
        <h1>already been done</h1>
        {/* <img src={logo} alt="abd-logo" /> */}
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={handleSetUsername}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={handleSetPassword}
          placeholder="Password"
        />
        <button>Log In</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authToken: state.authentication.authToken
  };
};

const mapDispathToProps = dispatch => {
  return {
    login: (username, password) => dispatch(login(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(
  LoginPanel
);
