const {
  EmbedBuilder,
  SlashCommandBuilder,
} = require(`discord.js`)

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`tralala`)
    .setDescription(`Touch Günther's tralala.`),

  async execute(
    _1,
    interaction,
  ) {
    await interaction.reply({
      content: `Ooh, you touched my thralala. Mmm, my ding ding dong.`,
      embeds: [
        new EmbedBuilder()
          .setImage(`https://media.tenor.com/lIVHCtkYKlAAAAAC/tralala-gunther.gif`)
      ],
      tts: true,
    })
  },
}
