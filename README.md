# Event Management System Using React + Express + JavaScript + TypeScript

## Introduction

This is a full-stack event management system built with **React** for the frontend and **Node.js** for the backend. The project uses **JavaScript** and **TypeScript** for efficient and scalable development. The frontend allows users to interact with the system via a web interface, while the backend handles server-side logic, database operations, and email notifications.

## Prerequisites

Before starting, ensure you have the following installed on your machine:

- **Node.js** (>= 14.x.x)
- **npm** (>= 6.x.x)

## Frontend Setup

The frontend is powered by **React** and **Axios** for making HTTP requests to the backend.

### Steps to set up the Frontend:

1. Navigate to the frontend directory (if you're working in a monorepo or separate directory setup for frontend).
2. Run the following command to install required dependencies:

    ```bash
    npm install react axios
    ```

3. To start the development server, run:

    ```bash
    npm run dev
    ```

### Frontend Stack:

- **React**: JavaScript library for building the user interface.
- **Axios**: Promise-based HTTP client to interact with the backend API.

### Running the Frontend

Once the dependencies are installed, you can run the development server. By default, it will start on `http://localhost:3000`.

## Backend Setup

The backend is built using **Node.js** and **Express.js**. It provides the API for the frontend and handles data storage, email notifications, and more.

### Steps to set up the Backend:

1. Navigate to the backend directory (if you are working in separate directories for frontend and backend).
2. Install all the necessary dependencies by running:

    ```bash
    npm install
    ```

3. Next, install the required libraries for backend functionality:

    ```bash
    npm i express cors mongoose nodemailer axios
    ```

### Backend Stack:

- **Express**: Minimal and flexible Node.js web application framework.
- **CORS**: Middleware for allowing cross-origin requests.
- **Mongoose**: A MongoDB ODM for data storage.
- **Nodemailer**: For sending emails, such as event notifications.
- **Axios**: To make HTTP requests, both internal and external.

### Running the Backend

To start the backend server, run the following command:

```bash
node server.js
```

This will start the server on `http://localhost:5000`.

### Backend Endpoints

The backend provides endpoints for:

- Creating, updating, and deleting events.
- Fetching event details.
- Sending email notifications using Nodemailer.

## Project Structure

The project is structured into frontend and backend folders, each containing the respective code and dependencies.

```
/event-management-system
    /frontend
        /src
        /public
        package.json
    /backend
        /src
        /config
        /routes
        package.json
    server.js
```

## Development Workflow

1. **Frontend**: Develop React components and use Axios to interact with the backend API.
2. **Backend**: Develop APIs using Express.js, use Mongoose for data management, and Nodemailer for sending event-related emails.

## Conclusion

You now have everything you need to set up and run the Event Management System. Follow the instructions above to get both the frontend and backend running, and start developing your features.

If you encounter any issues, feel free to reach out or open an issue in the repository.

Happy coding! 
