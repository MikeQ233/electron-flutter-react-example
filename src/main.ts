import './main/vite-env-as-node-env'; // set up environment variables from Vite
import { app, BrowserWindow, ipcMain, net, protocol } from 'electron';
import path from 'path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // in order to embed flutter web, we need to set headers to create an isolated context
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      callback({
        responseHeaders: {
          'Cross-Origin-Embedder-Policy': 'credentialless',
          'Cross-Origin-Opener-Policy': 'same-origin',
          ...details.responseHeaders,
        },
      });
    },
  );

  // in development, we redirect flutter asset to flutter dev server
  if (process.env.NODE_ENV === 'development') {
    const flutterProtocol = 'flutter://';
    const flutterRouteMatch = `${MAIN_WINDOW_VITE_DEV_SERVER_URL}/flutter/`;
    const flutterRedirect = `http://localhost:${process.env.FLUTTER_PORT}`;

    mainWindow.webContents.session.webRequest.onBeforeRequest(
      (details, callback) => {
        if (details.url.startsWith(flutterProtocol)) {
          const filePath = details.url.slice(flutterProtocol.length);
          const flutterDevServerUrl = `${flutterRedirect}/${filePath}`;
          callback({
            redirectURL: flutterDevServerUrl,
          });
        } else if (details.url.startsWith(flutterRouteMatch)) {
          const filePath = details.url.slice(flutterRouteMatch.length);
          const flutterDevServerUrl = `${flutterRedirect}/${filePath}`;
          callback({
            redirectURL: flutterDevServerUrl,
          });
        } else {
          callback({});
        }
      },
    );
  }

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  // if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
  mainWindow.webContents.openDevTools();
  // }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // use flutter protocol to serve flutter web build, since it's not a standard protocol
  // vite won't remove it from the final build
  protocol.handle('flutter', async (req) => {
    if (req.url !== 'flutter://flutter_bootstrap.js') {
      return null;
    }
    const filePath = req.url.slice('flutter://'.length);
    const response = await net.fetch(
      path.join(
        __dirname,
        `../renderer/${MAIN_WINDOW_VITE_NAME}/flutter`,
        filePath,
      ),
    );
    return response;
  });

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
