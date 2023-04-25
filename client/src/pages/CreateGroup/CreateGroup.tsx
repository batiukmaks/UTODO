import React, { useState } from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import Footer from "../../components/Footer/Footer";
import "../../styles/styles.css";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // handle form submission
    console.log("CreateGroup form submitted!");
    console.log("Name: ", groupName);
    console.log("Description: ", groupDescription);
  };

  return (
    <>
      <MainHeader />
      <main className="d-flex flex-column align-items-center justify-content-center mb-5">
        <div className="heading mb-2">
          <p>Create your group!</p>
        </div>
        <div className="border p-3 p-lg-5 mx-3">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Group name</label>
              <input
                id="groupName"
                className="form-control"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                id="groupDescription"
                className="form-control"
                placeholder="Describe the purpose of this group."
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
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
