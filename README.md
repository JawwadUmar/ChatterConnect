# ChatterConnect - A Real-Time Chat Application

ChatterConnect is a real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrated with Socket.IO for seamless real-time messaging. This project provides a user-friendly and responsive platform for users to chat with each other in real-time.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Hosting Notes](#hosting-notes)
- [Contributing](#contributing)

## Features

- **Real-Time Messaging:** Chat with other users in real-time, with messages instantly appearing on the screen.
- **User Authentication:** Secure user authentication with JWT (JSON Web Tokens) ensures privacy and access control.
- **User Profiles:** Users can create and update their profiles with profile pictures and personal information.
- **Private and Group Chats:** Start private conversations or create group chats with multiple participants.
- **Message History:** Access your chat history and scroll back to previous messages.
- **Notifications:** Receive notifications for new messages even when the app is not in focus.
- **Responsive Design:** The application is fully responsive, providing a seamless experience on both desktop and mobile devices.

## Demo

You can access a live demo of ChatterConnect [here](https://chatter-connect.onrender.com/). Feel free to explore the app and start chatting with others!

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB:** You'll need a MongoDB database. You can create a free account and set up a database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Socket.IO:** Familiarize yourself with Socket.IO for real-time messaging. Check out the [Socket.IO documentation](https://socket.io/docs/v4/) for more information.

## Installation

Follow these steps to set up and run ChatterConnect on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/JawwadUmar/ChatterConnect.git
   cd chatterconnect
   ```

2. Install the backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install the frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. Environment Variables Setup:

   **Backend:** Create a `.env` file in the `backend` directory:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

   **Frontend:** Create a `.env.development` file in the `frontend` directory:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

5. Run the application locally:

   You can run both the frontend and backend concurrently from the root directory:
   ```bash
   cd ..
   npm run dev
   ```
   Alternatively, you can start them separately:
   * **Backend:** `cd backend && npm run dev` (Runs on port 5000)
   * **Frontend:** `cd frontend && npm start` (Runs on port 3000)

6. Access the application in your web browser at `http://localhost:3000`.

## Usage

- Register and log in to your account.
- Explore the chat rooms or create a new private or group chat.
- Start sending real-time messages to your contacts.
- Customize your profile settings.
- Enjoy seamless chatting with friends and colleagues!

## Technologies Used

- **Frontend:**
  - React.js (via Vite)
  - Socket.IO-client
  - Axios
  - Chakra UI
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Socket.IO
  - JWT (JSON Web Tokens)
- **Version Control:**
  - Git
  - GitHub

## Hosting Notes

> **Note for Developers**: 
> The backend of this application is hosted on Render. Because free-tier Render services spin down after periods of inactivity, a cron job is configured to regularly ping the backend server to keep it awake and ensure immediate responses for users. 
> 
> You can manage the cron job at: [https://console.cron-job.org/jobs](https://console.cron-job.org/jobs)

## Contributing

We welcome contributions from the community. If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them thoroughly.
4. Create a pull request to the main repository.

---

Thank you for using ChatterConnect! I hope you enjoy using this real-time chat application as much as I enjoyed building it. If you encounter any issues or have suggestions for improvements, please feel free to open an issue on our GitHub repository. Happy chatting!
