// __mocks__/UserContext.js
import React from "react";

export const UsersContext = React.createContext({
  addUser: jest.fn(),
});
