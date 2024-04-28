import React from "react";
import TextField from "./TextField";
import { UsersContext } from "../context/UserContext";

function Modal({ user, handleCloseModal }) {
  const { deleteUser } = React.useContext(UsersContext);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const validerChamps = () => {
    if (password === "") {
      setError("Le mot de passe est vide.");
    } else {
      deleteUser(user.id ? user.id : user._id, password, {
        good: () => handleCloseModal(),
        bad: () => setError("Mauvais mot de passe"),
      });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "var(--background-color)",
        opacity: 0.9,
        zIndex: 9999,
        position: "absolute",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextField
          error={""}
          inputValue={password}
          onChange={(e) => setPassword(e.target.value)}
          title={"Mot de Passe"}
          name={"password"}
        />
        <div
          style={{
            display: "flex",
            marginTop: 10,
            gap: 5,
          }}
        >
          <button style={{ height: 30 }} onClick={() => validerChamps()}>
            Supprimer
          </button>
          <button style={{ height: 30 }} onClick={handleCloseModal}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
