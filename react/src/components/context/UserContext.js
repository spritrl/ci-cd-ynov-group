import React, { createContext, useState } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const port = 3001;
  const fetchUsers = async () => {
    const response = await fetch(`http://localhost:${port}/users`);
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:${port}/users/${userId}`, {
        method: "DELETE",
      });
      setUsers(
        users.filter((user) => {
          if (user._id) {
            return user._id !== userId;
          } else if (user.id) {
            return user.id !== userId;
          }
          return false;
        })
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const addUser = async (name, surname, mail, birthDate, city, postalCode) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        email: mail,
        birthDate,
        city,
        postalCode,
      }),
    };
    const response = await fetch(`http://localhost:${port}/users`, options);
    const data = await response.json();
    setUsers([data, ...users]);
  };

  return (
    <UsersContext.Provider value={{ deleteUser, addUser, users, fetchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
