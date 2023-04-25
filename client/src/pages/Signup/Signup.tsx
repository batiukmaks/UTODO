import React from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Footer from "../../components/Footer/Footer";
import "../../styles/styles.css";

const Signup = () => {
  return (
    <>
      <AuthHeader link="/" link_text="Log in"/>
      <main className="d-flex flex-column align-items-center justify-content-center mb-5">
        <div className="heading mb-2">
          <p>Create your account!</p>
        </div>
        <div className="border p-3 p-lg-5 mx-3 signup-form">
          <form autoComplete="off">
            <div className="row row-cols-1 row-cols-lg-2">
              <div className="form-group">
                <label>First name</label>
                <input
                  className="form-control"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  className="form-control"
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  className="form-control"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn theme-button">
              Sign up
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
