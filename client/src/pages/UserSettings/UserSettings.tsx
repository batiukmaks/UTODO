import React from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import "../../styles/styles.css";

const UserSettings = () => {
  return (
    <>
      <MainHeader />
      <main className="d-flex flex-column align-items-center justify-content-center mb-5">
        <div className="heading mb-2">
          <p>Edit your account!</p>
        </div>
        <div className="border p-3 p-lg-5 mx-3 signup-form">
          <form autoComplete="off">
            <div className="row row-cols-1 row-cols-lg-2">
              <div className="form-group">
                <label>First name</label>
                <input name="firstName" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input name="lastName" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input name="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Old password</label>
                <input
                  name="oldPassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter old password"
                />
              </div>
              <div className="form-group">
                <label>New password</label>
                <input
                  name="newPassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label>Confirm password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter new password again"
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn theme-button">
                Save
              </button>
              <a href="#" className="btn danger-button">
                Delete account
              </a>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserSettings;
