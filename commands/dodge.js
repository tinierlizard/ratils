/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

// Constants
const commandNames = ['sd', 'dodge', 'silentdodge'];

// Variables

// Functions
function command(args) {
    if (!commandNames.includes(args[0])) return;
}

// Init function
export function init() {
    // prettier-ignore
    register('command', ...args => command(args)).setName('rat');
}
