import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UsersList from "./UsersList";
import { UsersContext } from "../context/UserContext";

describe("UsersList Component Tests", () => {
  const users = [
    {
      id: "1",
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      city: "New York",
      postalCode: "12345",
      birthDate: "1990-01-01",
    },
    {
      id: "2",
      name: "Jane",
      surname: "Smith",
      email: "jane@example.com",
      city: "London",
      postalCode: "54321",
      birthDate: "1995-05-05",
    },
  ];

  const handleOpenModal = jest.fn();

  beforeEach(() => {
    render(
      <UsersContext.Provider value={{ users }}>
        <UsersList handleOpenModal={handleOpenModal} />
      </UsersContext.Provider>
    );
  });

  test("renders the user list card", () => {
    const userListCard = screen.getByText("Users Lists");
    expect(userListCard).toBeInTheDocument();
  });

  test("displays the number of users", () => {
    const userCount = screen.getByText(`${users.length}(show)`);
    expect(userCount).toBeInTheDocument();
  });
});
