/// <reference types="./../CTAutocomplete" />
/// <reference lib="es2015" />

commandList = ['webhookbomb'];

for (command of commandList) {
    require('./commands/' + command).init();
}

ChatLib.chat("[RT] All commands initialized and ready, use /rat [command] to continue");