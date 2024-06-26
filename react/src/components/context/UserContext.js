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

  const deleteUser = async (userId, password, callback) => {
    if (password) {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        });
        if (response.status === 204) {
          if (callback) {
            callback.good();
          }
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
        } else {
          if (callback) {
            callback.bad();
          }
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        if (callback) {
          callback.bad();
        }
      }
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
    const response = await fetch(`http://localhost:3001/users`, options);
    const data = await response.json();
    setUsers([data, ...users]);
  };

  React.useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <UsersContext.Provider value={{ deleteUser, addUser, users }}>
      {children}
    </UsersContext.Provider>
  );
};
