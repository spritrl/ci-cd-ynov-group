import React from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Modal from "./components/Form/Modal";
import UsersList from "./components/Form/UsersList";

function App() {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

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
      <UsersList handleOpenModal={handleOpenModal} />
      <Form />
    </>
  );
}

export default App;
