const { token } = require(`../auth.json`)
const { Client, Collection, Events, GatewayIntentBits } = require(`discord.js`)
const { createAudioPlayer } = require(`@discordjs/voice`)

const context = {
  player: createAudioPlayer(),
}

const commands = require(`./commands/index.js`)
  .reduce(
    (
      collection,
      command,
    ) => {
      collection.set(
        command.data.name,
        command,
      )
      return collection
    },
    new Collection(),
  )

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
})

client.once(
  Events.ClientReady,
  c => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
  },
)

client.on(
  Events.InteractionCreate,
  async interaction => {
    if (!interaction.isChatInputCommand()) {
      return
    }

    const command = commands.get(interaction.commandName)

    if (!command) {
      return
    }

    try {
      await command.execute(
        context,
        interaction,
      )
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `There was an error while executing this command!`,
        ephemeral: true,
      })
    }
  },
)

client.login(token)
