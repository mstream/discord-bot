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

function execute({ player }) {
  return async function({ embed, interaction, soundFile }) {
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
    const subscription = connection.subscribe(player)

    if (subscription) {
      player.play(createAudioResource(soundFile))

      await entersState(
        player,
        AudioPlayerStatus.Playing,
        3000,
      )
    }

    await interaction.editReply({
      embeds: [embed],
    })
  }
}

module.exports = context => execute(context)
