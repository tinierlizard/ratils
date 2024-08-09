/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

// Imports
import PogObject from 'PogData';
import { RatChat } from '../utils';

// Constants
const commandNames = ['sd', 'dodge', 'silentdodge'];
const dodgeData = new PogObject(
    'ratils',
    {
        names: [],
        reasons: [],
    },
    'dodge.data.json',
);
const ratChat = new RatChat();

// Variables

// Functions
// Main command
function command(args) {
    if (args == null) return;

    console.log(args);

    switch (args[0]) {
        case 'list':
            list();
            break;

        case 'add':
            if (args.length == 1) {
                ratChat.chat('Usage: add <username> [reason]');
            }
            add(args.slice(1));
            break;

        case 'remove':
            if (args.length == 1) {
                ratChat.chat('Usage: remove <username>');
            }
            remove(args.slice(1));

            break;

        case 'clear':
            clear();
            break;

        default:
            // help command
            ratChat.chat('Available sub-commands: list, add, remove');
            break;
    }
}

// List command
function list() {
    ratChat.chat('&cSilent Dodge List:', true);
    for (let i = 0; i < dodgeData.names.length; i++) {
        ratChat.chat(`&4${dodgeData.names[i]}&e: &4${dodgeData.reasons[i]}`);
    }
    ratChat.chatBreak();
}

// Add command
function add(args) {
    console.log('\n');
    console.log(args);
    const name = args.shift();
    const reason = args.length > 0 ? args.join(' ') : 'None';

    dodgeData.names.push(name);
    dodgeData.reasons.push(reason);
    ratChat.chat(`Added user ${name} for reason ${reason}`);
    dodgeData.save();
}

// Remove command
function remove(args) {
    const username = args[0];

    const index = dodgeData.names.indexOf(username);

    if (index == -1) {
        ratChat.error(`Could not find User ${username}`);
    }

    dodgeData.names.splice(index, 1);
    dodgeData.reasons.splice(index, 1);
    dodgeData.save();
    ratChat.chat(`Successfully removed user ${username}`);
}

// Clear command
function clear() {
    const entries = dodgeData.names.length;
    dodgeData.names = [];
    dodgeData.reasons = [];
    ratChat.chat(`Successfully removed ${entries} entries.`);
    dodgeData.save();
}

// Init function
export function init() {
    return [commandNames, command];
}
