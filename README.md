
cat <<EOL > README.md
# Social Media App - Codeial

This is a social media web application built using **Node.js**, **Express.js**, **MongoDB**, **Passport.js**, and **JWT** for authentication. It allows users to sign up, log in, post content, and comment on posts. It integrates Google OAuth2.0 authentication for easy sign-ins and uses AJAX for dynamic content updates.

## Features

- **User Authentication**: Sign up, log in, and sign out functionality.
- **Google OAuth2.0 Authentication**: Allow users to authenticate using their Google accounts.
- **Posting**: Users can create posts, delete them, and view posts by others.
- **Commenting**: Users can comment on posts, and view comments made by others.
- **AJAX Integration**: For seamless and dynamic interactions like posting and deleting posts.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js (Local Strategy + Google OAuth2.0), JWT
- **CSS**: SASS (Node-SASS Middleware)
- **Frontend**: EJS for templating, AJAX for asynchronous operations
- **Session Management**: Express-Session, MongoDB Store

## Setup Instructions

Follow these steps to set up the project locally:

### Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/codeial.git
cd codeial
```

### Step 2: Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### Step 3: Set Up MongoDB

Ensure MongoDB is installed and running on your local machine. If you don't have MongoDB installed, you can follow [MongoDB's installation guide](https://docs.mongodb.com/manual/installation/).

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory and add your config.

Make sure to replace the values with your own credentials for Google OAuth.

### Step 5: Run the Application

```bash
npm start
```

This will start the server at \`http://localhost:8000\`.

### Step 6: Google OAuth2.0 Authentication

To enable Google login functionality, create credentials for OAuth 2.0 on the [Google Developer Console](https://console.developers.google.com/). Add your redirect URI in the console and update the credentials in your `.env` file.

## Features Walkthrough

### 1. User Authentication

- Users can sign up using email and password.
- Google OAuth2.0 login is available for easy sign-ins.
- User sessions are handled using **Express-Session**.
- JWT is used for secure authentication in API routes.

### 2. Post Creation

- Users can create posts by entering text in the post creation form.
- Posts are displayed on the home page.
- Users can delete posts if they are the ones who created them.

### 3. Commenting on Posts

- Users can comment on posts by entering text in the comment form below each post.
- Comments are displayed dynamically without page reload using AJAX.

### 4. Dynamic Interactions Using AJAX

- **Create Post**: When a user submits the form to create a post, the post is added to the DOM without refreshing the page.
- **Delete Post**: When a user clicks on the "X" button to delete a post, the post is removed from the DOM without a page reload.
- **Create Comment**: Similar to posts, comments are added dynamically using AJAX when a user submits the comment form.

## Directory Structure

```
├── assets
│   ├── css
│   ├── scss
├── config
│   ├── mongoose.js
│   ├── passport-local-strategy.js
│   ├── passport-jwt-strategy.js
│   └── session.js
├── controllers
│   ├── home_controller.js
│   ├── user_controller.js
│   ├── post_controller.js
├── models
│   ├── post.js
│   ├── user.js
│   ├── comment.js
├── routes
│   ├── index.js
│   ├── user.js
│   ├── posts.js
│   ├── comments.js
├── views
│   ├── home.ejs
│   ├── profile.ejs
│   ├── user_sign_up.ejs
│   └── user_sign_in.ejs
├── uploads
│   ├── users
│   │   └── avatar
├── .env
├── package.json
└── server.js
```

## How to Contribute

1. Fork the repository.
2. Create a new branch: \`git checkout -b feature-branch\`.
3. Make your changes.
4. Commit your changes: \`git commit -m 'Add new feature'\`.
5. Push to the branch: \`git push origin feature-branch\`.
6. Open a pull request.

EOL

# Confirm that the file has been generated
echo "README.md has been generated successfully!"
