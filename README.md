# Blog Frontend

## Project Overview

This project is the React frontend for the Spring Boot Blog REST API. It provides a user interface for interacting with the blog's functionalities such as viewing, creating, updating, and deleting blog posts and comments. It also handles user authentication and displays categories effectively.

## Current Features

- **Dynamic Posts Display:** Users can view a list of all blog posts and select individual posts to view detailed content.
- **Authentication System:** Supports user registration and login.
- **Create, Update, and Delete Posts:** Users can manage their blog posts through the interface.

## Prerequisites

- Node.js
- npm or yarn

## Technology Stack

- **React:** A JavaScript library for building user interfaces.
- **Axios:** Promise based HTTP client for the browser and node.js.
- **React Router:** Declarative routing for React.

## Setup and Installation

1. **Clone the frontend repository:**
   ```
   git clone [your-frontend-repository-url]
   cd blog-frontend
   ```
2. **Install dependencies:**
    ```
    npm install
    ```
3. **Run the Application:** Start the development server:
    ```
    npm start
    ```
   This will run the app in the development mode.
   Open http://localhost:3000 to view it in the browser.

## Environment Configuration  

- Ensure that the frontend is connected to the backend API by configuring the API URLs in your service files or using environment variables.

## Building for Production

- To build the app for production, run:
   ```
   npm run build
   ```
   This builds the app to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

