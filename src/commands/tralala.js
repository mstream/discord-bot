const {
  EmbedBuilder,
  SlashCommandBuilder,
} = require(`discord.js`)

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`tralala`)
    .setDescription(`Touch Günther's tralala.`),

  async execute(
    {
      textToSpeech,
      voiceAndPost,
    },
    interaction,
  ) {

    await voiceAndPost({
      embed: new EmbedBuilder()
        .setImage(`https://media.tenor.com/lIVHCtkYKlAAAAAC/tralala-gunther.gif`),
      interaction,
      soundFile: await textToSpeech.generateSpeechFile({
        speed: 0.9,
        text: `Ooh, you touched my thralala. Mmm, my ding ding dong.`,
        voice: `Alex`,
      }),
    })
  },
}
