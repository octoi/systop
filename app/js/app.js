const { ipcRenderer } = require('electron');

ipcRenderer.on('settings:get', (e, settings) => {
    document.getElementById('cpu-overload').value = settings.cpuOverload;
    document.getElementById('alert-frequency').value = settings.alertFrequency;
});