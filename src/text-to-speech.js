const path = require(`node:path`)

function generateSpeechFile({ say, tmpDir }) {
  return function({ speed, text, voice }) {
    return new Promise((
resolve, reject,
) => {
      const speechFile = path.join(
        tmpDir,
        `tts.wav`,
      )

      const timeoutId = setTimeout(
reject,
5_000,
)

      say.export(
        text,
        voice,
        speed,
        speechFile,
        (error) => {
          if (error) {
            clearTimeout(timeoutId)
            reject(error)
          }
        },
)

      clearTimeout(timeoutId)
      resolve(speechFile)
    })
  }
}

module.exports = context => ({
  generateSpeechFile: generateSpeechFile(context),
})
