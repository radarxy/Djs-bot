const { getfiles } = require("../util/functions")
const fs = require("fs")

//const { category } = require("../commands/info/ping")

module.exports = (bot, reload) => {
    const { client } = bot

    fs.readdirSync("./commands/").forEach((category) => {
        let commands = getfiles(`./commands/${category}`, ".js")

        commands.forEach((f) => {
            if (reload)
                delete require.cache[require.resolve(`../commads/${category}/${f}`)]
            const command = require(`../commands/${category}/${f}`)
            client.commands.set(command.name, command)
        })
    })
    console.log(`loaded ${client.commands.size}commands`)
}