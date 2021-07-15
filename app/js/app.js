const settingsForm = document.getElementById('settings-form');

// get settings
ipcRenderer.on('settings:get', (_, settings) => {
    document.getElementById('cpu-overload').value = settings.cpuOverload;
    document.getElementById('alert-frequency').value = settings.alertFrequency;
});

// submit settings
settingsForm.addEventListener('submit', event => {
    event.preventDefault();

    const cpuOverload = document.getElementById('cpu-overload').value;
    const alertFrequency = document.getElementById('alert-frequency').value;

    ipcRenderer.send('settings:set', { cpuOverload, alertFrequency }); // sending data to main process
    showAlert("Settings Saved");
});

// show alert for settings
function showAlert(msg) {
    const alert = document.getElementById('alert');
    alert.classList.remove('hide');
    alert.classList.add('alert');
    alert.innerText = msg;

    setTimeout(() => {
        alert.classList.remove('alert');
        alert.classList.add('hide');
    }, 3000)
}