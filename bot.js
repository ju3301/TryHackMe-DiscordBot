// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = "!";

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    // Splitting prefix, command & args
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    // Switch cases for differents commands
    switch (command) {
        case "ping":
            message.reply(ping(message))
            break;
        default:
            break;
    }
});

function ping(message) {
    const timeTaken = Date.now() - message.createdTimestamp;
    return `Bot had a latency of ${timeTaken}ms.`
}

// Login to Discord with your client's token
client.login(token);
