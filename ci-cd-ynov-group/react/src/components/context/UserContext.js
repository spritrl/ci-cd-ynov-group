import React, { createContext, useState } from "react";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch(`http://localhost:3001/users`);
    const data = await response.json();
    console.log(data);
    setUsers(data);
  };

  const deleteUser = async (userId, port) => {
    try {
      await fetch(`http://localhost:${port}/users/${userId}`, {
        method: "DELETE",
      });
      setUsers(
        users.filter((user) => {
          if (user._id) {
            if (user._id !== userId) {
              return user;
            }
          } else if (user.id) {
            if (user.id !== userId) {
              return user;
            }
          }
        })
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const addUser = async (
    name,
    surname,
    mail,
    birthDate,
    city,
    postalCode,
    port
  ) => {
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

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ deleteUser, addUser, users }}>
      {children}
    </UsersContext.Provider>
  );
};
