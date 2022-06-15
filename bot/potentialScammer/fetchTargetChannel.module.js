//because the bot will tell the user who may be scammer
//so the bot needs to send the a list of scammers on 'may-be-scammer' channel
//find this channel on all channels,and tell everyone who might be a scammer

const { createChannel } = require('../common')
const getChannels = (guild) => {
  return guild.channels.cache
}

const isTargetChannel = (channel) => {
  return (channel.name === 'may-be-scammer' && channel.type === 'GUILD_TEXT')
}

const searchTargetChannel = (channels, targetChannelRules) => {
  return channels.find(channel => targetChannelRules(channel))
}

const fetchTargetChannel = async (guild) => {
  const channels = getChannels(guild)
  let targetChannel = searchTargetChannel(channels, isTargetChannel)
  if (!targetChannel) {
    targetChannel = await createChannel(guild, 'may-be-scammer', 'GUILD_TEXT')
  }
  return targetChannel
}

module.exports = { fetchTargetChannel }
