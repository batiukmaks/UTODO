import React, { useState } from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Footer from "../../components/Footer/Footer";
import "../../styles/styles.css";
import { fetch_data } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send email and password to server to authenticate
    try {
      const data = await fetch_data(
        "/user/login",
        "POST",
        {
          email: email,
          password: password,
        },
        false
      );
      localStorage.setItem("access_token", data.access_token);
      navigate("/tasks");
    } catch (error: any) {
      window.alert("Error: " + error.message);
    }
  };

  return (
    <>
      <AuthHeader link="/signup" link_text="Sign Up" />
      <main className="d-flex flex-column align-items-center justify-content-center mb-5">
        <div className="heading mb-2">
          <p>Log into your account!</p>
        </div>
        <div className="border p-3 p-lg-5 mx-3 signup-form">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
