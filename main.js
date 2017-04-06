'use strict';

var electron = require('electron');

var app = electron.app;

var BrowserWindow = electron.BrowserWindow;

var ipc = electron.ipcMain;

var mainWindow = null;

app.on('window-all-closed', function() {

  if (process.platform != 'darwin')

    app.quit();

});

app.on('ready', function() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 960
  });

  mainWindow.loadURL('file://' + __dirname + '/main.html');

  mainWindow.on('closed', function() {

    mainWindow = null;

  });

});

ipc.on('openDev', function() {
  if (mainWindow) {
    // Open the DevTools.
    mainWindow.openDevTools();
  }
});
