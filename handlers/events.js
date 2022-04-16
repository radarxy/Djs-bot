const { getfiles } = require("../util/functions")

module.exports = (bot, reload) => {
    const { client } = bot

    let events = getfiles("./events/", ".js")

    if (events.length == 0) {
        console.log("no events to load")
    }

    events.forEach((f, i) => {
        if (reload)
            delete require.cache[require.resolve(`../event/${f}`)]
        const event = require(`../events/${f}`)
        client.events.set(event.name, event)

        if (!reload)
            console.log(`${i + 1}. ${f} loaded`)
    })

    if (!reload)
        initEvents(bot)
}

function triggerEventHandler(bot, event, ...args) {
    const { client } = bot

    try {
        if (client.events.has(event))
            client.events.get(event).run(bot, ...args)
        else
            throw new Error(`Event ${event} doesnt not exist`)
    }
    catch (err) {
        console.error(err)
    }
}

function initEvents(bot) {
    const { client } = bot
    client.on("ready", () => {
        triggerEventHandler(bot, "ready")
    })

    client.on("messagecreate", () => {
        triggerEventHandler(bot, "messagecreate")
    })
}