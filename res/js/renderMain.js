  mdc.autoInit();

  var ipc = require('electron').ipcRenderer

  var MDCTemporaryDrawer = mdc.drawer.MDCTemporaryDrawer;
  var drawer = new MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
  document.querySelector('#menuBtn').addEventListener('click', function() {
    drawer.open = true;
  });
  document.querySelector('.openDev').addEventListener('click', function() {
    ipc.send('openDev');
  });

  var dialog = new mdc.dialog.MDCDialog(document.querySelector('#testDialog'));
  document.querySelector('#pressMeBtn').addEventListener('click', function (evt) {
      	  dialog.lastFocusedTarget = evt.target;
          dialog.show();
  });