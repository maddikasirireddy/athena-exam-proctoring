# Athena — Desktop Exam Proctoring Application

Athena is a desktop-based exam monitoring application built using **Electron, React, Vite, and JavaScript**.

The application provides a controlled environment for examination sessions by requiring camera access and kiosk mode before starting a timed monitoring session. During the session, Athena automatically captures camera images and stores them locally.

The primary goal of this project is to demonstrate **Electron desktop APIs, window management, inter-process communication (IPC), and system-level interactions** through a practical application.

## Features

### 1. Camera Access and Monitoring
- Requests camera access before starting a session.
- Displays a camera preview after permission is granted.
- Automatically captures images at five-second intervals during the session.
- Saves captured images locally in the `electron/cameraFeed/` directory.
- Stops scheduled image capture and releases the camera when the session ends.
- Handles camera permission and image capture errors.

### 2. Full-Screen Kiosk Mode
- Uses Electron's `BrowserWindow` kiosk functionality.
- Requires kiosk mode activation before starting the session.
- Uses `win.isKiosk()` to verify kiosk activation.
- Provides visual confirmation when kiosk mode is enabled.

### 3. Examination Rules
- Displays exam instructions through an Electron native dialog.
- Allows users to accept or cancel the rules.
- Starts the monitoring session only after the rules are accepted.

### 4. Session Timer
- Starts a 60-minute countdown after the rules are accepted.
- Retrieves the remaining time through Electron IPC.
- Automatically ends the session when the countdown reaches zero.
- Allows the user to end the session manually.

### 5. Session Completion
- Stops scheduled camera captures.
- Releases the camera stream.
- Displays a session completion message.
- Prevents the setup screen and active session screen from appearing simultaneously.

## Technologies Used

| Technology | Purpose |
|---|---|
| Electron | Desktop application and window management |
| React | User interface and state management |
| Vite | Frontend development server |
| JavaScript | Application logic |
| Node.js | Local file system operations |
| HTML and CSS | Interface structure and styling |

## Project Structure

```text
Desktop-Application-Athena/
├── electron/
│   ├── main.cjs           # Electron main process
│   ├── preload.cjs        # IPC bridge
│   └── cameraFeed/        # Locally saved images (gitignored)
├── public/
├── src/
│   ├── App.jsx            # UI and session logic
│   ├── App.css            # Application styling
│   └── main.jsx           # React entry point
├── index.html
├── package.json
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js and npm
- Git
- A working webcam
- macOS, Windows, or Linux with Electron support

### 1. Clone the repository

```bash
git clone https://github.com/maddikasirireddy/Desktop-Application-Athena.git
```

### 2. Open the project folder

```bash
cd Desktop-Application-Athena
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

Open a second terminal in the same directory:

```bash
npm start
```

Allow camera access when prompted.

## How Athena Works

1. **Launch:** The user opens Athena as an Electron desktop application.
2. **Camera Setup:** The application requests camera access and displays a live preview.
3. **Kiosk Mode:** The user enables kiosk mode, which is verified through Electron.
4. **Rules Confirmation:** A native dialog displays the examination rules.
5. **Session Start:** The countdown begins after the user accepts the rules.
6. **Monitoring:** Camera images are captured periodically and saved locally.
7. **Session End:** The session ends automatically when time expires or manually when the user clicks End Session.
8. **Cleanup:** Scheduled captures stop, the camera stream is released, and the completion screen appears.

## Electron Concepts Implemented

### BrowserWindow and Kiosk Mode

Electron's `BrowserWindow` creates the desktop application window. Kiosk mode is used to provide a full-screen examination environment.

### Inter-Process Communication (IPC)

Athena uses `ipcRenderer.invoke()` and `ipcMain.handle()` to communicate between the React renderer process and Electron's main process.

IPC is used for:
- Enabling kiosk mode.
- Displaying examination rules.
- Starting the session timer.
- Retrieving remaining session time.
- Saving captured images.

### Preload Script and contextBridge

The preload script exposes selected Electron functionality to the React frontend using `contextBridge`, allowing the renderer to request desktop operations through a defined API.

### Native Dialogs

Electron's dialog API displays the examination rules and returns the user's selection to the React interface.

### File System Operations

Node.js `fs` and `path` modules are used to create the image directory when necessary and save captured camera images as JPEG files.

## Testing

The following functionality has been manually tested:

| Test Case | Result |
|---|---|
| Camera permission and preview | Passed |
| Prevent session without camera access | Passed |
| Require kiosk activation before starting | Passed |
| Accept examination rules | Passed |
| Cancel examination rules | Passed |
| Countdown timer | Passed |
| Automatic photo capture | Passed |
| Save captured images locally | Passed |
| Stop scheduled captures after session | Passed |
| Manual session completion | Passed |
| Automatic session completion | Passed |
| Release camera after completion | Passed |
| Display correct session screen | Passed |

## Limitations

Athena is an academic prototype rather than a production-ready examination security system.

- It does not include question papers, answer submission, or grading.
- It does not provide remote invigilation or cloud storage.
- Kiosk activation is verified when enabled, but kiosk state is not continuously monitored.
- Camera capture failures are logged but do not automatically terminate the session.
- The application does not guarantee prevention of all operating-system shortcuts or external activities.
- The application has been manually tested on macOS; other platforms require additional testing.

## Future Improvements

- Continuous verification of kiosk mode.
- Better handling of camera disconnection during a session.
- Session logs and monitoring reports.
- Improved application security and packaging.

## Author

**Maddika Siri Reddy**

GitHub: https://github.com/maddikasirireddy

## Project Purpose

Developed as an academic Electron desktop application project to demonstrate desktop APIs, windows, IPC communication, and system-level interactions.
