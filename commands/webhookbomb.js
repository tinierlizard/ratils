/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />

let enable = false;
let link;
import request from '../../requestV2';

const commandNames = ['webhookbomb', 'whbomb', 'whb', 'wb']; // these names include the command name and all aliases

function bomb() {
    if (!enable) return; // gotta check each run to see if we've been disabled or not
    if (!link) {
        // if we've no webhook then we need to send an error and return
        ChatLib.chat('[RT] No webhook link set');
        return;
    }
    
    request({
        url: link,
        method: 'POST',
        headers: {
            'User-agent': 'Mozilla/5.0',
        },
        body: {
            content: 'hahahahahhahahahahaha',
        },
    }).then(() => {
        ChatLib.chat('[RT] Webhook post made');
    }).catch((e) => {
        ChatLib.chat("something went wrong");
        console.log(e);
    });
    setTimeout(() => {
        bomb();
    }, 500);


}

function isOneOf(a, b) {
    for (x of b) {
        console.log(x, a, a == x);
        if (a == x) {
            return true;
        }
    }

    return false;
}

function command(args) {
    if (args == null) return;
    if (!isOneOf(args[0], commandNames)) return;

    args = args.slice(1); // removes the command name from the args list

    console.log(args);

    switch (args[0]) {
        case 'toggle':
            enable = !enable;
            if (enable) bomb();
            break;
        case 'link':
            if (args[1] == null) {
                ChatLib.chat(
                    '[RT] You must provide a link to change the bomber to',
                );
            }
            link = args[1];
            ChatLib.chat('[RT] Link was successfully changed');
            break;
        default:
            // help command
            ChatLib.chat('[RT] Available sub-commands: toggle, link');
            break;
    }
}

export function init() {
    // prettier-ignore
    register('command', ...args => command(args)).setName('rat');
}
