const path = require('path');
const osu = require('node-os-utils');

const os = osu.os;
const cpu = osu.cpu;
const mem = osu.mem;

// Run every 2 second
setInterval(() => {
    cpu.usage().then(info => {
        document.getElementById('cpu-usage').innerText = info + '%'; // cpu usage
    });

    cpu.free().then(info => {
        document.getElementById('cpu-free').innerText = info + '%'; // display free cpu
    });
}, 2000);

// Set model
document.getElementById('cpu-model').innerText = cpu.model();

// Info tab
document.getElementById('comp-name').innerText = os.hostname(); // Computer name
document.getElementById('os').innerHTML = `${os.type()} ${os.arch()}`; // os with architecture

mem.info().then(info => {
    document.getElementById('mem-total').innerText = info.totalMemMb; // ram
});