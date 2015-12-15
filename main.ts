'use strict';
import * as electron from 'electron';
const app: GitHubElectron.App = electron.app;
const browserWindow = electron.BrowserWindow;
const crashReporter = electron.crashReporter;
crashReporter.start();

let mainWindow: GitHubElectron.BrowserWindow = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new browserWindow({ height: 800, width: 1024 });
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
