import React from "react";
import "./App.css";
import { UsersContext } from "./components/context/UserContext";
import Form from "./components/Form/Form";

function App() {
  const port = "3001";
  const [showUsersList, setShowUsersList] = React.useState(false);
  const { users, deleteUser, fetchUsers } = React.useContext(UsersContext);

  React.useEffect(() => {
    fetchUsers(port);
    // eslint-disable-next-line
  }, []);

  return (
    <>
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
              <div onClick={() => deleteUser(user.id ?? user._id)}>Delete</div>
            </div>
          ))}
        </>
      )}
      <Form />
    </>
  );
}

export default App;
