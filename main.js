const { app, BrowserWindow, Menu } = require('electron')
const Store = require('./Store');

process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV === 'development';
const isMac = process.platform === 'darwin';

let mainWindow;

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
        resizable: isDev ? true : false,
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