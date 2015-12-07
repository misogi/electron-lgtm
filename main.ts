'use strict';
const app: GitHubElectron.App = require('app');
const BrowserWindow = require('browser-window');

require('crash-reporter').start();

let mainWindow: GitHubElectron.BrowserWindow = null;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 1024, height: 800});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
