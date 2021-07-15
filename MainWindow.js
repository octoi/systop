const { BrowserWindow } = require('electron');

const isDev = process.env.NODE_ENV === 'development';

class MainWindow extends BrowserWindow {
    constructor({ file, isDev }) {
        super({
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
        });

        this.loadFile(file);

        if (isDev) {
            this.webContents.openDevTools()
        }
    }
}

module.exports = MainWindow;