const commandReaction = (interaction) => {
  if (interaction.commandName === 'ping') {
     interaction.reply('Pong!')
  }

  if (interaction.commandName === 'hello') {
     interaction.reply('Nice!')
  }

  if (interaction.commandName === 'whhitelist') {
    interaction.reply('Show the whitelist!')
  }
}

module.exports = { commandReaction }
