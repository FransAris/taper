const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.resolve(__dirname, '../preload/preload.js'),
      sandbox: false
    }
  });

  // Open DevTools immediately
  win.webContents.openDevTools();

  // Log any load failures
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Loading development URL...');
    win.loadURL('http://localhost:3000').catch(console.error);
  } else {
    console.log('Loading production file...');
    win.loadFile(path.join(__dirname, '../../public/index.html')).catch(console.error);
  }

  // Log when content is loaded
  win.webContents.on('did-finish-load', () => {
    console.log('Content loaded successfully');
  });
}

app.whenReady().then(() => {
  console.log('App ready, creating window...');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); 