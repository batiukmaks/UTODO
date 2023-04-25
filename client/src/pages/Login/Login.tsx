import React from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Footer from "../../components/Footer/Footer";
import "../../styles/styles.css";

const Login = () => {
  return (
    <>
      <AuthHeader link="/signup" link_text="Sign Up"/>
      <main className="d-flex flex-column align-items-center justify-content-center mb-5">
        <div className="heading mb-2">
          <p>Log into your account!</p>
        </div>
        <div className="border p-3 p-lg-5 mx-3 signup-form">
          <form autoComplete="off">
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" className="btn theme-button">
              Log in
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
