const messageReactionModule = (message) => {
  if (message.mentions.has(message.client.user.id)) {
    message.reply('Hello')
  }
}

module.exports = { messageReaction: messageReactionModule }
