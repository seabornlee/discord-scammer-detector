const { USER_PREFERRED_HELLO } = require(
  './internationalizationSayHello.config.json')

const createChannel =  (guild, channelName, channelType) => {
  //I think create channel is a thing,that is "who do what"
  //Guild create a name is what, type is what channel,
  //just like Mary gave birth to a girl named Lin
  return guild.channels.create(channelName, {
      type: channelType,
      permissionOverwrites: [
        {
          id: guild.id,
          allow: ['VIEW_CHANNEL'],
        },
      ],
    },
  )

}

const fetchUserPreferredHelloMessage = (userPreferredLocale) => {
  return USER_PREFERRED_HELLO[userPreferredLocale]
}

const getUserPreferredLocale = (guild) => {
  return guild.preferredLocale
}

const sendMessage = (channel,messageContent) => {
  channel.send(messageContent)
}
module.exports = {
  createChannel,
  fetchUserPreferredHelloMessage,
  getUserPreferredLocale,
  sendMessage
}
