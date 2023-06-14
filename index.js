const { app, Tray, BrowserWindow, Menu } = require("electron");
app.setName("FC Announcement Maker")
const path = require("path");

let mainWindow = null;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({icon: path.join(__dirname, 'icon.png')});
  
  mainWindow.loadFile("index.html");

  // Minimize window to tray
  mainWindow.on("minimize", (event) => {
    event.preventDefault();
    mainWindow.hide();
  });
}


// Create a context menu for the tray icon
const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: "Quit",
      click: () => {
        app.quit();
      }
    }
  ]);


app.on("ready", () => {
  tray = new Tray(path.join(__dirname, "img/icon.png"));
  tray.setToolTip("Announcement Maker");
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    mainWindow.show();
    mainWindow.focus();
  });

  

  createWindow();
});