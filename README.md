# ci-cd-ynov-group

This project consists of two architectures: one with MongoDB, Node.js, and React, and another with MySQL, Python, and React. Both architectures provide APIs for managing user data and a frontend application built with React. (12 hours it was harder than expected)

## Prerequisites

Before running the project, make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## How to Run

1. Clone the repository:

   ```
   git clone https://github.com/spritrl/ci-cd-ynov-group.git
   ```

2. Navigate to the project directory:

   ```
   cd ci-cd-ynov-group
   ```

3. Choose the desired architecture:

   - For MongoDB, Node.js, and React:

     ```
     docker-compose -f docker-compose-nodejs.yml up --build
     ```

   - For MySQL, Python, and React:

     ```
     docker-compose -f docker-compose-python.yml up --build
     ```

4. Access the frontend application in your web browser at `http://localhost:3000`.

## API Endpoints

### MongoDB and Node.js Architecture

- `GET /users`: Retrieve all users.
- `POST /users`: Create a new user.
- `DELETE /users/:id`: Delete a user by ID (requires a password specified in the `.env` file).

### MySQL and Python Architecture

- `GET /users`: Retrieve all users.
- `POST /users`: Create a new user.
- `DELETE /users/:id`: Delete a user by ID (requires a password specified in the `.env` file).

## User Schema

The user schema for both architectures includes the following fields:

- `name` (String)
- `surname` (String)
- `email` (String)
- `birthDate` (String)
- `city` (String)
- `postalCode` (String)

## Frontend

The frontend application is built with React and is accessible at `http://localhost:3000`. It provides an interface to interact with the selected API architecture based on the chosen port.

## Notes

- Make sure to set the appropriate environment variables in the `.env` file for each architecture, including the password for deleting users.
- The frontend application is exposed on port 3000.
- The APIs are accessible through the frontend application based on the selected API port.

## License

This project is licensed under the [MIT License](LICENSE).
