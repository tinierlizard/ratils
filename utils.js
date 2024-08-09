export class RatChat {
    constructor() {}

    chat(msg, prepend = false) {
        if (prepend) this.chatBreak();
        ChatLib.chat('&8[&5RT&8] &e' + msg);
    }

    error(msg, prepend = false) {
        if (prepend) this.chatBreak();
        ChatLib.chat('&8[&5RT&8] &cERR: ' + msg);
    }

    warn(msg, prepend = false) {
        if (prepend) this.chatBreak();
        ChatLib.chat('&8[&5RT&8] &e&lWRN: ' + msg);
    }

    chatBreak(sep = '-') {
        ChatLib.chat('&5' + ChatLib.getChatBreak(sep));
    }

    direct(msg) {
        ChatLib.chat(msg);
    }

    getPrefix() {
        return '&8[&5RT&8]&e'
    }
}
