# ChatterConnect - A Real-Time Chat Application

ChatterConnect is a real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrated with Socket.IO for seamless real-time messaging. This project provides a user-friendly and responsive platform for users to chat with each other in real-time.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-Time Messaging:** Chat with other users in real-time, with messages instantly appearing on the screen.
- **User Authentication:** Secure user authentication with JWT (JSON Web Tokens) ensures privacy and access control.
- **User Profiles:** Users can create and update their profiles with profile pictures and personal information.
- **Private and Group Chats:** Start private conversations or create group chats with multiple participants.
- **Message History:** Access your chat history and scroll back to previous messages.
- **Online Status:** See who is online and available for chatting.
- **Notifications:** Receive notifications for new messages even when the app is not in focus.
- **Emojis and File Sharing:** Add emojis to messages and share files with ease.
- **Responsive Design:** The application is fully responsive, providing a seamless experience on both desktop and mobile devices.

## Demo

You can access a live demo of ChatterConnect [here](#insert_demo_link). Feel free to explore the app and start chatting with others!

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB:** You'll need a MongoDB database. You can create a free account and set up a database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Socket.IO:** Familiarize yourself with Socket.IO for real-time messaging. Check out the [Socket.IO documentation](https://socket.io/docs/v4/) for more information.

## Installation

Follow these steps to set up and run ChatterConnect on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chatterconnect.git
   ```

2. Navigate to the project directory:

   ```bash
   cd chatterconnect
   ```

3. Install the server dependencies:

   ```bash
   npm install
   ```

4. Install the client dependencies:

   ```bash
   cd client
   npm install
   ```

5. Create a `.env` file in the project root and set the following environment variables:

   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your-mongodb-uri
   SECRET_KEY=your-secret-key
   ```

   Replace `your-mongodb-uri` with your MongoDB URI and `your-secret-key` with a secret key for JWT.

6. Run the server:

   ```bash
   npm run server
   ```

7. In a separate terminal, navigate to the `client` directory and start the client:

   ```bash
   cd client
   npm start
   ```

8. Access the application in your web browser at `http://localhost:3000`.

## Usage

- Register and log in to your account.
- Explore the chat rooms or create a new private or group chat.
- Start sending real-time messages to your contacts.
- Customize your profile settings.
- Enjoy seamless chatting with friends and colleagues!

## Technologies Used

- **Frontend:**
  - React.js
  - Socket.IO-client
  - Axios
  - Material-UI
  - React-Emoji
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Socket.IO
  - JWT (JSON Web Tokens)
- **Deployment:**
  - Heroku (server)
  - Netlify (client)
- **Version Control:**
  - Git
  - GitHub

## Contributing

We welcome contributions from the community. If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them thoroughly.
4. Create a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Thank you for using ChatterConnect! We hope you enjoy using this real-time chat application as much as we enjoyed building it. If you encounter any issues or have suggestions for improvements, please feel free to open an issue on our GitHub repository. Happy chatting!
