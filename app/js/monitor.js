const path = require('path');
const osu = require('node-os-utils');

const os = osu.os;
const cpu = osu.cpu;
const mem = osu.mem;

// Set model
document.getElementById('cpu-model').innerText = cpu.model();