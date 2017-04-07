'use strict';

var fs = require('fs');

// simple logger
var output = fs.createWriteStream('./stdout.log');
var errorOutput = fs.createWriteStream('./stderr.log');
var logger = new console.Console(output, errorOutput);

var electron = require('electron');

var app = electron.app;

var BrowserWindow = electron.BrowserWindow;

var ipc = electron.ipcMain;

var storage = require('electron-json-storage');

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

ipc.on('readMemo', function(event) {
  if(storage) {
    storage.get('memo', function(error,data) {
      if(error) {
        logger.log(error);
        throw error;
      }
      event.sender.send('readedMemo', data);
    });
  }
});

ipc.on('saveMemo', function(evt, param) {
  if(storage) {
    storage.set('memo', param, function(error) {
      if(error) {
        logger.log(error);
        throw error;
      }
    });
  }
});

storage.get('config', function (error, data) {
  if(error) throw error;
  if (Object.keys(data).length === 0) {
    logger.log('config empty');
  } else {
    logger.log(data);
  }
});