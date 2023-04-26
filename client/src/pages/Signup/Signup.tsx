import React, { useState } from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Footer from "../../components/Footer/Footer";
import "../../styles/styles.css";
import { fetch_data } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send data to server to authenticate
    console.log("Sign up form submitted!");
    console.log("First name: ", firstName);
    console.log("Last name: ", lastName);
    console.log("Email: ", email);
    console.log("Password: ", password);

    const response = await fetch_data('/user/signup', 'POST', {
      name: firstName,
      surname: lastName,
      email: email,
      password: password
      }, false);
    navigate("/")
  };

  return (
    <>
      <AuthHeader link="/" link_text="Log in" />
      <main className="d-flex flex-column align-items-center justify-content-center mb-5">
        <div className="heading mb-2">
          <p>Create your account!</p>
        </div>
        <div className="border p-3 p-lg-5 mx-3 signup-form">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="row row-cols-1 row-cols-lg-2">
              <div className="form-group">
                <label>First name</label>
                <input
                  className="form-control"
                  placeholder="Enter first name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  className="form-control"
                  placeholder="Enter last name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  className="form-control"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
