const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})
/*
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
*/
let bot = {
    client,
    prefix: "n.",
    owners: ["964294915108536351"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

client.login(process.env.TOKEN)