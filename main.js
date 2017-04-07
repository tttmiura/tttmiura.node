'use strict';

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

ipc.on('readMemo', function() {
  if(storage) {
    storage.get('memo', function(error,data) {
      if(error) throw error;
      
      ipc.send('readedMemo', data);
    });
  }
});

ipc.on('saveMemo', function(data) {
  if(storage) {
    storage.set('memo', data, function(error) {
      if(error) throw error;
    });
  }
});

storage.get('config', function (error, data) {
  if(error) throw error;
  if (Object.keys(data).length === 0) {
    console.log('config empty');
  } else {
    console.log(data);
  }
});