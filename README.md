# Athena — Desktop Exam Proctoring Application

Athena is a desktop-based exam monitoring application developed using **Electron, React, Vite, JavaScript, and Node.js**.

The application provides a controlled examination environment using kiosk mode, webcam monitoring, automated image capture, and a session countdown timer.

This project demonstrates the practical implementation of Electron desktop APIs, inter-process communication (IPC), window management, and local file system operations.

## Features

### 1. Camera Access and Monitoring
- Requests webcam permission before starting an examination.
- Displays a live camera preview.
- Automatically captures images every 5 seconds during an active session.
- Saves captured images locally in `electron/cameraFeed/`.
- Stops image capture and releases camera resources when the session ends.
- Handles camera permission and image capture errors.

### 2. Full-Screen Kiosk Mode
- Uses Electron's `BrowserWindow` kiosk functionality.
- Requires kiosk mode activation before starting an examination.
- Verifies kiosk activation using `win.isKiosk()`.
- Provides visual confirmation when kiosk mode is enabled.

### 3. Examination Rules
- Displays examination instructions using an Electron native dialog.
- Allows the user to accept or cancel the rules.
- Starts the examination only after the rules are accepted.

### 4. Examination Timer
- Starts a 60-minute countdown after confirmation.
- Retrieves the remaining time through Electron IPC.
- Automatically ends the session when the timer reaches zero.
- Supports manual session completion.

### 5. Session Completion
- Stops automatic image capture.
- Releases the camera stream.
- Displays a completion message.
- Prevents the setup screen and active examination screen from appearing simultaneously.

## Tech Stack

| Technology | Purpose |
|---|---|
| Electron | Desktop application and window management |
| React | User interface and state management |
| Vite | Frontend development and build tooling |
| JavaScript | Application logic |
| Node.js | Local file system operations |
| HTML & CSS | Application structure and styling |

## Project Structure

```text
athena-exam-proctoring/
├── electron/
│   ├── main.cjs
│   ├── preload.cjs
│   └── cameraFeed/        # Captured images (gitignored)
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   └── assets/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js and npm
- Git
- A working webcam
- A desktop operating system supporting Electron

### 1. Clone the repository

```bash
git clone https://github.com/maddikasirireddy/athena-exam-proctoring.git
```

### 2. Navigate to the project directory

```bash
cd athena-exam-proctoring
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the Vite development server

Open a terminal and run:

```bash
npm run dev
```

### 5. Launch Electron

Open another terminal in the same project directory:

```bash
npm start
```

Allow camera access when prompted.

## Application Workflow

1. **Launch Application:** Athena opens as an Electron desktop application.
2. **Camera Initialization:** The application requests webcam access and displays a live preview.
3. **Enable Kiosk Mode:** The user activates full-screen kiosk mode.
4. **Verify Kiosk Mode:** Electron confirms that kiosk mode is enabled.
5. **Accept Examination Rules:** A native dialog displays the examination instructions.
6. **Start Examination:** A 60-minute countdown begins after the rules are accepted.
7. **Automatic Monitoring:** Camera images are captured every 5 seconds and stored locally.
8. **End Examination:** The session ends automatically when the timer expires or manually when the user selects End Session.
9. **Resource Cleanup:** Camera access and scheduled image captures are stopped, and the completion screen is displayed.

## Electron Concepts Implemented

### BrowserWindow and Kiosk Mode

Electron's `BrowserWindow` API is used to create and manage the desktop application window.

Kiosk mode provides a full-screen examination environment.

### Inter-Process Communication (IPC)

Athena uses Electron IPC to communicate between the React renderer process and Electron's main process.

The application uses:

- `ipcRenderer.invoke()`
- `ipcMain.handle()`

IPC supports operations such as:

- Enabling kiosk mode
- Displaying examination rules
- Starting the examination timer
- Retrieving remaining session time
- Saving captured camera images

### Preload Script and Context Bridge

Electron's `contextBridge` exposes selected desktop functionality to the React frontend through a defined API.

This separates renderer logic from privileged Electron operations.

### Native Dialogs

Electron's native dialog functionality is used to display examination rules and process the user's confirmation.

### File System Operations

Node.js `fs` and `path` modules are used to manage the local image storage directory and save captured camera images.

## Testing

The application has been manually tested for the following functionality:

| Test Case | Result |
|---|---|
| Camera permission request | Passed |
| Live camera preview | Passed |
| Prevent session without camera access | Passed |
| Kiosk mode activation | Passed |
| Kiosk mode verification | Passed |
| Examination rules acceptance | Passed |
| Examination rules cancellation | Passed |
| Countdown timer | Passed |
| Automatic image capture | Passed |
| Local image storage | Passed |
| Manual session completion | Passed |
| Automatic session completion | Passed |
| Camera cleanup after session | Passed |
| Session completion screen | Passed |

Testing was performed on macOS.

## Limitations

Athena is an academic prototype and is not intended to function as a production-ready examination security platform.

Current limitations include:

- No question paper management, answer submission, or grading.
- No remote invigilation or cloud-based monitoring.
- Kiosk mode is verified during activation but is not continuously monitored.
- Camera capture failures do not automatically terminate the examination.
- The application cannot guarantee prevention of all operating-system shortcuts or external activities.
- Cross-platform functionality requires additional testing.

## Future Enhancements

- Continuous kiosk mode verification.
- Improved camera disconnection handling.
- Examination activity logs and reports.
- Secure image storage and management.
- Enhanced error handling and application security.
- Cross-platform application packaging.

## Project Background

This academic project extends an existing Electron application with examination workflow and monitoring functionality. Development work included modifications to camera capture, session handling, error handling, and user interface behavior.

## Author

**Maddika Siri Reddy**

GitHub: https://github.com/maddikasirireddy

Repository: https://github.com/maddikasirireddy/athena-exam-proctoring

## Project Purpose

Developed as part of academic coursework to explore desktop application development using Electron, React, JavaScript, IPC communication, camera access, and operating-system-level interactions.