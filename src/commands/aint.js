const path = require(`node:path`)

const {
  EmbedBuilder,
  SlashCommandBuilder,
} = require(`discord.js`)

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`aint`)
    .setDescription(`Ain't nobody got time for dat!`),

  async execute(
    { voiceAndPost },
    interaction,
  ) {
    await voiceAndPost({
      embed: new EmbedBuilder()
        .setImage(`https://media.tenor.com/DPpYFfMVaSIAAAAC/factz-facts.gif`),
      interaction,
      soundFile: path.join(
        `assets`,
        `aint.mp3`,
      ),
    })
  },
}
