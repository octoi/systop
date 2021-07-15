const path = require('path');
const osu = require('node-os-utils');

const os = osu.os;
const cpu = osu.cpu;
const mem = osu.mem;

// Set model
document.getElementById('cpu-model').innerText = cpu.model();

// Info tab
document.getElementById('comp-name').innerText = os.hostname(); // Computer name
document.getElementById('os').innerHTML = `${os.type()} ${os.arch()}`; // os with architecture

mem.info().then(info => {
    document.getElementById('mem-total').innerText = info.totalMemMb; // ram
});