import React from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import "../../styles/styles.css";

const CreateGroup = () => {
  return (
    <>
      <MainHeader />
      <main className="d-flex flex-column align-items-center justify-content-center mb-5">
        <div className="heading mb-2">
          <p>Create your group!</p>
        </div>
        <div className="border p-3 p-lg-5 mx-3">
          <form autoComplete="off">
            <div className="form-group">
              <label>Group name</label>
              <input
                id="groupName"
                className="form-control"
                placeholder="Enter group name"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                id="groupDescription"
                className="form-control"
                placeholder="Describe the purpose of this group."
              ></textarea>
            </div>
            <button type="submit" className="btn theme-button">
              Create
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CreateGroup;
