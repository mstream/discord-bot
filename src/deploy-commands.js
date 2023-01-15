const { REST, Routes } = require(`discord.js`)
const { clientId, guildId, token } = require(`../auth.json`)

const commands = require(`./commands/index.js`)

const rest = new REST({ version: `10` })
  .setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`)

    const data = await rest.put(
      Routes.applicationGuildCommands(
        clientId,
        guildId,
      ),
      { body: commands.map(cmd => cmd.data.toJSON()) },
    )

    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    console.error(error)
  }
})()

