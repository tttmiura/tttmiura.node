  mdc.autoInit();

  var ipc = require('electron').ipcRenderer

  ipc.on('readedMemo', function(evt, param) {
    console.log(param);
    if(Object.keys(param).length === 0) {
      return;
    }
    
    let mainContentValue = param.mainContent;
    document.querySelector('#mainContent').textContent = mainContentValue;
  });

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
    let mainContentValue = document.querySelector('#mainContent').textContent;
    let param = {mainContent : mainContentValue};
    
    ipc.send('saveMemo', param);
    
    dialog.lastFocusedTarget = evt.target;
    dialog.show();
  });

  ipc.send('readMemo');
