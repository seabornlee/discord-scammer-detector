const getChannelList = (guild) => {
  return guild.channels.cache
}

const getTargetChannelId = async (guild) => {
  let targetChannelId
  const channelList = await getChannelList(guild)
  channelList.forEach(channel => {
    if (channel.name === 'may-be-scammer' && channel.type === 'GUILD_TEXT') {
      targetChannelId = channel.id
    }
  })
  return targetChannelId
}

module.exports = { getTargetChannelId }
