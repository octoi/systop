const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const path = require('path');
const Store = require('./Store');

// process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV === 'development';
const isMac = process.platform === 'darwin';

let mainWindow;
let tray;

// init store & default
const store = new Store({
    configName: 'user-settings',
    defaults: {
        settings: {
            cpuOverload: 80,
            alertFrequency: 5,
        }
    }
});

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'SysTop',
        width: isDev ? 800 : 355,
        height: 600,
        icon: `${__dirname}/assets/icons/icon.png`,
        resizable: isDev,
        show: false,
        opacity: 0.9,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    if (isDev) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile('./app/index.html')
}


app.on('ready', () => {
    createMainWindow()

    mainWindow.webContents.on('dom-ready', () => {
        mainWindow.webContents.send('settings:get', store.get('settings'));
    });

    const icon = path.join(__dirname, 'assets', 'icons', 'tray_icon.png');
    tray = new Tray(icon);

    tray.on('click', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide()
        } else {
            console.log("show")
            mainWindow.show();
        }
    });

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)
})

const menu = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
        role: 'fileMenu',
    },
    ...(isDev
        ? [
            {
                label: 'Developer',
                submenu: [
                    { role: 'reload' },
                    { role: 'forcereload' },
                    { type: 'separator' },
                    { role: 'toggledevtools' },
                ],
            },
        ]
        : []),
]

// set settings
ipcMain.on('settings:set', (_, value) => {
    store.set('settings', value);
    mainWindow.webContents.send('settings:get', store.get('settings'));
});

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})

app.allowRendererProcessReuse = true