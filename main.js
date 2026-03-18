const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const fs   = require('fs');

let mainWindow;
let tray;

function createTray() {
  const iconPath = path.join(__dirname, 'assets', 'icon.ico');
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon);
  tray.setToolTip('Claude Tabs');

  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.focus();
    } else {
      mainWindow.show();
    }
  });

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Abrir Claude Tabs',
      click: () => { mainWindow.show(); mainWindow.focus(); }
    },
    { type: 'separator' },
    {
      label: 'Fechar',
      click: () => { app.isQuiting = true; app.quit(); }
    }
  ]));
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    frame: false,
    backgroundColor: '#0a0a0f',
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    },
    title: 'Claude Tabs'
  });

  mainWindow.loadFile('index.html');

  // ── Intercepta F5 / Ctrl+R / Ctrl+Shift+R no nível do webContents da janela ──
  // Isso tem prioridade sobre o renderer e impede o Electron de recarregar o app.
  mainWindow.webContents.on('before-input-event', (event, input) => {
    const isF5      = input.type === 'keyDown' && input.key === 'F5';
    const isCtrlR   = input.type === 'keyDown' && input.key === 'r' && input.control && !input.shift;
    const isCtrlShiftR = input.type === 'keyDown' && input.key === 'r' && input.control && input.shift;

    if (isF5 || isCtrlR || isCtrlShiftR) {
      event.preventDefault(); // bloqueia reload do app
      const hard = isCtrlShiftR;
      mainWindow.webContents.send('reload-active-webview', { hard });
    }
  });

  // Recolhe para bandeja em vez de fechar
  mainWindow.on('close', (e) => {
    if (!app.isQuiting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  // Não faz nada — app fica vivo na bandeja
});

app.on('before-quit', () => {
  app.isQuiting = true;
});

// Controles de janela via IPC
ipcMain.on('window-minimize',   () => mainWindow.minimize());
ipcMain.on('window-toggle-max', () => {
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});
ipcMain.on('window-close', () => mainWindow.hide()); // botão X recolhe para bandeja

// Relay: webview → main → renderer (credit limit detection)
ipcMain.on('credit-status', (event, data) => {
  if (mainWindow) mainWindow.webContents.send('credit-status', data);
});