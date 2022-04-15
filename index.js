const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}`)
})

// triggered when someone sends a message
client.on("messageCreate", (message) => {
    if (message.content == "ping") {
        message.reply("pong")
    }
})

client.login(process.env.TOKEN)