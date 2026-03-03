# BadgerChat Mobile

BadgerChat is a React Native mobile chat application built with Expo. Users can browse public chatrooms, register an account, post and delete messages, and log out — all from a native iOS or Android experience.

## Tech Stack

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/) (Drawer + Native Stack)
- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/) for JWT storage
- [react-native-paper](https://reactnativepaper.com/) for UI components
- REST API hosted at `https://cs571api.cs.wisc.edu/rest/s25/hw9/`

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Expo Go](https://expo.dev/go) app on your iOS or Android device **or** an emulator (e.g. [Android Virtual Device](https://developer.android.com/studio/run/emulator))

## Installation

```bash
npm install
```

## Running the App

```bash
npm start
```

This launches the Expo dev server. From there you can:

- **Physical device** — scan the QR code with the Expo Go app (iOS or Android)
- **Android emulator** — press `a` in the terminal
- **iOS simulator** — press `i` in the terminal (macOS only)

> Do **not** use the web browser (`w`) to test — the app is intended for Android or iOS only.

## Project Structure

```
├── App.js                          # Entry point
├── src/
│   └── components/
│       ├── BadgerChat.jsx          # Root navigation setup
│       ├── screens/
│       │   ├── BadgerLoginScreen.jsx
│       │   ├── BadgerRegisterScreen.jsx
│       │   ├── BadgerLandingScreen.jsx
│       │   ├── BadgerChatroomScreen.jsx
│       │   ├── BadgerLogoutScreen.jsx
│       │   └── BadgerConversionScreen.jsx
│       └── helper/
│           ├── BadgerChatMessage.jsx
│           └── BadgerCard.jsx
└── _figures/                       # UI screenshots
```

## Features

### Login & Registration

Users can log in with an existing username and 7-digit PIN, or register a new account. PIN input is masked, uses a number-pad keyboard, and validation errors are shown inline. Users can switch between login and registration screens freely.

![](_figures/step1.png)

---

### Chatroom Browser

After logging in, a landing page greets the user. A side drawer lets users navigate between all available chatrooms. Each chatroom displays its messages in a scrollable list with pull-to-refresh support. Each message shows its title, author, body, and posting date.

![](_figures/step2.png)

---

### Create a Post

A floating **ADD POST** button opens a modal where users can enter a title and body. The submit button is disabled until both fields are filled. On success, an alert confirms the post and the chatroom feed refreshes automatically.

![](_figures/step3.png)

---

### Delete a Post

A **DELETE POST** button appears on any message that belongs to the currently logged-in user. Tapping it removes the post and shows a confirmation alert, then refreshes the feed.

![](_figures/step4.png)

---

### Logout

A **Logout** option is available in the navigation drawer. The logout screen asks for confirmation before clearing the stored JWT and returning the user to the login screen.

![](_figures/step5.png)

---

### Guest Access

Users can browse all chatrooms without an account by tapping **Continue as Guest** on the login screen. Guests can read posts but cannot create or delete them. Instead of a logout option, the drawer shows a **Signup** screen that prompts guests to create an account.

![](_figures/step6.png)

## API Reference

All endpoints are relative to `https://cs571api.cs.wisc.edu/rest/s25/hw9/`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/chatrooms` | Get all chatrooms |
| `GET` | `/messages?chatroom=NAME` | Get messages for a chatroom |
| `POST` | `/messages?chatroom=NAME` | Post a message to a chatroom |
| `DELETE` | `/messages?id=ID` | Delete a message by ID |
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Log in and receive a JWT |
| `GET` | `/whoami` | Get the currently logged-in user |

Authenticated requests must include the header:

```
Authorization: Bearer <JWT>
```

Requests with a body must also include:

```
Content-Type: application/json
```
