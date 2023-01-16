const { REST, Routes } = require(`discord.js`)
const { clientId, token } = require(`../auth/bot.json`)
const guilds = require(`../auth/guilds.json`)
const { Option, program } = require('commander');
const commands = require(`./commands/index.js`)

const options = program
  .addOption(new Option(
    '--guild <name>',
    'guild name',
  ).makeOptionMandatory()
    .choices(Object.keys(guilds))
  )
  .parse()
  .opts()

const guildId = guilds[options.guild]

if (!guildId) {
  throw Error(`Invalid guide name: ${options.guild}`)
}

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

