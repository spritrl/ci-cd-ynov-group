import React from "react";
import "./App.css";
import { UsersContext } from "./components/context/UserContext";
import Form from "./components/Form/Form";
import Modal from "./components/Form/Modal";

function App() {
  const [showUsersList, setShowUsersList] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const { users } = React.useContext(UsersContext);

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  return (
    <>
      {showModal && (
        <Modal handleCloseModal={handleCloseModal} user={selectedUser} />
      )}
      <div
        style={{
          backgroundColor: "var(--card-background-color)",
          color: "var(--card-text-color)",
          padding: "10px 20px",
          borderRadius: "10px",
          width: "20%",
          minWidth: "300px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        name={"user-list-card"}
        onClick={() => setShowUsersList(!showUsersList)}
      >
        <div>Users Lists</div>
        <div>
          {users.length}({showUsersList ? "hide" : "show"})
        </div>
      </div>
      {showUsersList && (
        <>
          {users.map((user, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "var(--card-background-color)",
                color: "var(--card-text-color)",
                padding: "20px",
                borderRadius: "10px",
                width: "20%",
                minWidth: "300px",
                marginBottom: 5,
              }}
              name={`${user.email}-card`}
            >
              <div style={{ display: "flex", gap: 5 }}>
                <div>Nom : {user.name}</div>-<div>Prenom : {user.surname}</div>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                <div>Ville : {user.city}</div>-
                <div>Code postal : {user.postalCode}</div>
              </div>
              <div>E-mail : {user.email}</div>
              <div>Date de naissance : {user.birthDate}</div>
              <div
                style={{ backgroundColor: "red", cursor: "pointer" }}
                onClick={() => handleOpenModal(user)}
                name={`delete-button-${user.email}`}
              >
                Delete
              </div>
            </div>
          ))}
        </>
      )}
      <Form />
    </>
  );
}

export default App;
