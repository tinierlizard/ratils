/// <reference types="./../CTAutocomplete" />
/// <reference lib="es2015" />

import { RatChat } from './utils';

const fileList = ['dodge'];
const commands = new Map();
const ratChat = new RatChat();

for (let command of fileList) {
    let info = require('./commands/' + command).init();
    commands.set(info[0], info[1]);
}

// Root command register
// prettier-ignore
register('command', ...args => {
    try {
        commands.forEach((val, key) => {
            if (key.includes(args[0])) {
                val(args.slice(1));
            }
        })
    } catch (e) {
        console.log(e);
        ratChat.error(`Command ${args[0]} not found`);
    }
})
    .setName('ratils')
    .setAliases(['rt', 'rat']);
