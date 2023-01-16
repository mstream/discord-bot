const path = require(`node:path`)

const {
  EmbedBuilder,
  SlashCommandBuilder,
} = require(`discord.js`)

const {
  AudioPlayerStatus,
  VoiceConnectionStatus,
  createAudioResource,
  entersState,
  joinVoiceChannel,
} = require(`@discordjs/voice`)

async function connectToChannel(channel) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  })

  try {
    await entersState(
      connection,
      VoiceConnectionStatus.Ready,
      5_000,
    )

    return connection
  } catch (error) {
    connection.destroy()
    throw error
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`aint`)
    .setDescription(`Ain't nobody got time for dat!`),

  async execute(
    { player },
    interaction,
  ) {
    const voiceChannel = interaction?.member?.voice.channel

    if (!voiceChannel) {
      await interaction.reply({
        content: `Please join a voice channel to use this command.`,
        ephemeral: true,
      })
      return
    }

    await interaction.deferReply()

    const connection = await connectToChannel(voiceChannel)

    const resource = createAudioResource(path.join(
      `assets`,
      `aint.mp3`,
    ))

    const subscription = connection.subscribe(player)

    if (subscription) {
      setTimeout(
        () => subscription.unsubscribe(),
        5_000,
      )

      player.play(resource)
      await entersState(
        player,
        AudioPlayerStatus.Playing,
        3000,
      )
    }

    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setImage(`https://media.tenor.com/DPpYFfMVaSIAAAAC/factz-facts.gif`),
      ],
    })
  },
}
