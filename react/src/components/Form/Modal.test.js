import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import { UsersContext } from "../context/UserContext";

describe("Modal Component Tests", () => {
  const user = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  };

  const deleteUser = jest.fn();
  const handleCloseModal = jest.fn();

  beforeEach(() => {
    render(
      <UsersContext.Provider value={{ deleteUser }}>
        <Modal user={user} handleCloseModal={handleCloseModal} />
      </UsersContext.Provider>
    );
  });

  test("renders the password input field", () => {
    const passwordInput = screen.getByPlaceholderText("Mot de Passe");
    expect(passwordInput).toBeInTheDocument();
  });

  test("displays an error message when the password is empty", () => {
    const deleteButton = screen.getByText("Supprimer");
    fireEvent.click(deleteButton);

    const errorMessage = screen.getByText("Le mot de passe est vide.");
    expect(errorMessage).toBeInTheDocument();
  });

  test("calls deleteUser with the correct arguments when the password is provided", () => {
    const passwordInput = screen.getByPlaceholderText("Mot de Passe");
    const deleteButton = screen.getByText("Supprimer");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(deleteButton);

    expect(deleteUser).toHaveBeenCalledWith(
      user.id,
      "password123",
      expect.objectContaining({
        good: expect.any(Function),
        bad: expect.any(Function),
      })
    );
  });

  test("calls handleCloseModal when the close button is clicked", () => {
    const closeButton = screen.getByText("Fermer");
    fireEvent.click(closeButton);

    expect(handleCloseModal).toHaveBeenCalled();
  });

  test("calls handleCloseModal when deleteUser callback is called with good password", () => {
    const passwordInput = screen.getByPlaceholderText("Mot de Passe");
    const deleteButton = screen.getByText("Supprimer");

    deleteUser.mockImplementation((userId, password, callbacks) => {
      callbacks.good();
    });

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(deleteButton);

    expect(handleCloseModal).toHaveBeenCalled();
  });

  test("does not call handleCloseModal when deleteUser callback is called with bad password", () => {
    const passwordInput = screen.getByPlaceholderText("Mot de Passe");
    const deleteButton = screen.getByText("Supprimer");

    deleteUser.mockImplementation((userId, password, callbacks) => {
      callbacks.bad();
    });

    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(deleteButton);

    expect(handleCloseModal).not.toHaveBeenCalled();
  });

  test("calls deleteUser with the correct arguments when the password is provided", () => {
    const passwordInput = screen.getByPlaceholderText("Mot de Passe");
    const deleteButton = screen.getByText("Supprimer");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(deleteButton);

    expect(deleteUser).toHaveBeenCalledWith(
      user.id,
      "password123",
      expect.objectContaining({
        good: expect.any(Function),
        bad: expect.any(Function),
      })
    );
  });
});
