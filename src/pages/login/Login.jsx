import React, { useState } from "react";
import "./Login.css";
import SignUpPage from "../signUpPage/SignUpPage";
import logo from "../../assets/netflix-logo.png";

function Login() {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="login">
      <div className="login-background">
        <img className="login-logo" src={logo} alt="loginBackground" />
        <button onClick={() => setSignIn(true)} className="login-button">
          Sign In
        </button>
        <div className="login-gradient"></div>
      </div>
      <div className="login-body">
        {signIn ? (
          <SignUpPage />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch Anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="login-input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  onClick={() => setSignIn(true)}
                  className="get-started-btn"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
