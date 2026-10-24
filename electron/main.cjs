const {
  BrowserWindow,
  app,
  ipcMain,
  dialog,
} = require("electron");
const path = require("path");
const { requestFormReset } = require("react-dom");
const fs = require("fs")
const { arrayBuffer } = require("stream/consumers");

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  win.loadURL("http://localhost:5173/");
}


ipcMain.handle("full-screen", () => {
  win.kiosk = true;
  return win.isKiosk();
});

let end_time = null;


ipcMain.handle("start-test", () => {
  end_time = Date.now() + 2 * 60 * 1000;
});



ipcMain.handle("get-time", () => {
  if (end_time === null) return 0;
  return Math.max(0, end_time - Date.now());
});


ipcMain.handle("show-rules", async () => {
  const res = await dialog.showMessageBox(win, {
    type: "info",
    title: "Exam Rules",
    message: "Please follow these things",
    detail: `
    1. Do not open any new tab.
    2.You will get 0 marks if you cheat`,
    buttons: ["Accept", "Cancel"],
    defaultId: 0
  })
  return res.response
});


ipcMain.handle("save-photo", (event, arrayBuffer) => {
  const folderPath = path.join(__dirname, "cameraFeed");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const filePath = path.join(folderPath, `${Date.now()}.jpg`);
  const buffer = Buffer.from(arrayBuffer);

  fs.writeFileSync(filePath, buffer);
});


app.whenReady().then(() => {
  createWindow();
});
