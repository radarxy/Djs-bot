const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
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

const welcomechannelID = "964573758293704704"

client.on("guildMemberAdd", (member) => {
    member.guild.channels.cache.get(welcomechannelID).send(`<@${member.id}> welcome to the server`)
})

client.login(process.env.TOKEN)