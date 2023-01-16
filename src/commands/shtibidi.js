const {
  EmbedBuilder,
  SlashCommandBuilder,
} = require(`discord.js`)

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`shtibidi`)
    .setDescription(`Shtibidies with optional alterations.`)
    .addStringOption(option =>
      option.setName(`input`)
        .setDescription(`"dob" substitute`)
        .setRequired(false)
        .addChoices(
          {
            name: `knob`,
            value: `knob`,
          },
          {
            name: `Nix`,
            value: `nix`,
          },
        )),

  async execute(
    {
      textToSpeech,
      voiceAndPost,
    },
    interaction,
  ) {
    const word = interaction.options.getString(`input`) ?? `dob`
    const sentenceStart = `Brr-brr shtibidi`
    const sentenceMiddle = Array.from(
      { length: 5 },
      () => word,
    )
      .join(` `)

    const sentenceEnd = `yes yes shtib shtib shtib shtibidid shtibidi dabudu dabudu yes yes!`

    await voiceAndPost({
      embed: new EmbedBuilder()
        .setImage(`https://media.tenor.com/p97W37yZba8AAAAd/tummy-kolo.gif`),
      interaction,
      soundFile: await textToSpeech.generateSpeechFile({
        speed: 1.1,
        text: `${sentenceStart}${sentenceMiddle} ${sentenceEnd}`,
        voice: `Rishi`,
      }),
    })
  },
}
