const path = require('path');
const osu = require('node-os-utils');

const os = osu.os;
const cpu = osu.cpu;
const mem = osu.mem;

let cpuOverload = 10;

notifyUser({
    title: "CPU overload",
    body: `CPU is over ${cpuOverload}%`,
    icon: path.join(__dirname, 'img', 'icon.png'),
});

// Run every 2 second
setInterval(() => {
    cpu.usage().then(info => {
        document.getElementById('cpu-usage').innerText = info + '%'; // cpu usage

        document.getElementById('cpu-progress').style.width = info + '%'; // display progress
        document.getElementById('cpu-progress').style.background = info > cpuOverload ? 'red' : '#30c88b'; // change color of progress
    });

    cpu.free().then(info => {
        document.getElementById('cpu-free').innerText = info + '%'; // display free cpu
    });

    // uptime
    document.getElementById('sys-uptime').innerText = secondsToDhms(os.uptime())
}, 2000);

// display cpu model 
document.getElementById('cpu-model').innerText = cpu.model();

// Info tab
document.getElementById('comp-name').innerText = os.hostname(); // Computer name
document.getElementById('os').innerHTML = `${os.type()} ${os.arch()}`; // os with architecture

mem.info().then(info => {
    document.getElementById('mem-total').innerText = info.totalMemMb; // ram
});

// show days, hours, min, sec
function secondsToDhms(seconds) {
    seconds = +seconds;

    const d = Math.floor(seconds / (3600 * 24)); // day
    const h = Math.floor((seconds % (3600 * 24)) / 3600); // hour
    const m = Math.floor((seconds % 3500) / 60); // minute
    const s = Math.floor(seconds % 60); // seconds

    return `${d}d, ${h}h, ${m}m, ${s}s`;
}

// send notification
function notifyUser(options) {
    try {
        new Notification(options.title, { body: options.body });
    } catch (err) {
        console.log('err: ', err)
    }
}