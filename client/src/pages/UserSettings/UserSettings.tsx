import React, { useEffect } from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import "../../styles/styles.css";
import { fetch_data } from "../../utils/api";

const UserSettings = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");

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
      window.alert("Account updated successfully")
    }
    catch (error: any) {
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
                <label>First name</label>
                <input
                  name="firstName"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  name="lastName"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Old password</label>
                <input
                  name="oldPassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>New password</label>
                <input
                  name="newPassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Confirm password</label>
                <input
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

            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserSettings;
