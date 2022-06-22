const commandReaction = (interaction) => {
  if (interaction.commandName === 'ping') {
     interaction.reply('Pong!')
  }

  if (interaction.commandName === 'hello') {
     interaction.reply('Nice!')
  }
}

module.exports = { commandReaction }
