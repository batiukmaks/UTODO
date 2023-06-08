import React, { useEffect, useState } from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import "../../styles/styles.css";
import { fetch_data } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchData = async () => {
    const data = await fetch_data("/user/me", "GET");
    setFirstName(data.name);
    setLastName(data.surname);
    setEmail(data.email);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      window.alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch_data("/user/", "PUT", {
        name: firstName,
        surname: lastName,
        email: email,
        old_password: oldPassword,
        password: newPassword,
      });
      window.alert("Account updated successfully");
    } catch (error: any) {
      window.alert(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await fetch_data(`/user/${localStorage.getItem("current_user_id")}`, "DELETE");
      window.alert("Account deleted successfully");
      navigate(`/`);
    } catch (error: any) {
      window.alert(error);
    }
  };

  return (
    <>
      <MainHeader />
      <main className="d-flex flex-column align-items-center justify-content-center mb-5">
        <div className="heading mb-2">
          <p>Edit your account!</p>
        </div>
        <div className="border p-3 p-lg-5 mx-3 signup-form">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="row row-cols-1 row-cols-lg-2">
              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="oldPassword">Old password</label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter new password again"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
            <button type="submit" className="btn theme-button">
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="btn danger-button"
            >
              Delete account
            </button>
            </div>
          </form>
        </div>
      </main>

      {showDeleteModal && (
  <div className="modal-backdrop show" style={{ zIndex: 1050 }}></div>
)}
<div
  className={`modal ${showDeleteModal ? "show" : ""}`}
  id="deleteAccountModal"
  tabIndex={-1}
  aria-labelledby="deleteAccountModalLabel"
  aria-hidden={!showDeleteModal}
  style={{ display: showDeleteModal ? "block" : "none", zIndex: 1051 }}
>
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="deleteAccountModalLabel">
          Delete Account
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setShowDeleteModal(false)}
        ></button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to delete your account?</p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDeleteAccount}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</div>
      <Footer />
    </>
  );
};

export default UserSettings;
