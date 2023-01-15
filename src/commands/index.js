const fs = require(`node:fs`)
const commands = []
const commandsPath = __dirname

const commandFileFilter = file =>
  file.endsWith(`.js`) && file !== `index.js`

const commandFiles = fs.readdirSync(commandsPath)
  .filter(commandFileFilter)

for (const file of commandFiles) {
  const command = require(`./${file}`)

  if (`data` in command && `execute` in command) {
    commands.push(command)
  } else {
    throw Error(`The command at ${file} is missing a required "data" or "execute" property.`);
  }
}

module.exports = commands
