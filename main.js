import { app, BrowserWindow } from "electron/main";
import path from "node:path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";
import http from "http"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let backend;

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.maximize();
  win.loadFile("index.html");
}

function waitForServer(url, timeout = 8000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      http.get(url, res => {
        resolve();
      }).on("error", () => {
        if (Date.now() - start > timeout) reject("Server timeout");
        else setTimeout(check, 500);
      });
    };
    check();
  });
}

app.whenReady().then(() => {
  // Jalankan backend secara silent (tanpa terminal baru)
  backend = spawn("node", [path.join(__dirname, "api", "process.js")], {
    stdio: "ignore", // tidak munculkan terminal
    detached: true, // biar tetap jalan di background
    env: { ...process.env },
  });

  backend.unref(); // lepas dari proses utama

  try {
    waitForServer("http://localhost:3000");
    console.log("✅ Backend siap");
  } catch (error) {
    console.error("Backend gagal start:", err);
  }
  
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (backend) backend.kill();
  if (process.platform !== "darwin") app.quit();
});

app.on("window-all-closed", () => {
  if (backend) backend.kill();
  if (process.platform !== "darwin") app.quit();
});
