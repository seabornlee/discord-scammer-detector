const getChannelList =  (guild) => {
  //get all channel of a guild
  const channelList = guild.channels.cache
  return channelList
}

const getTargetChannelId = async (guild) => {
  //get the target channel id
  let targetChannelId
  const channelList =  await getChannelList(guild)
  channelList.forEach(channel => {
    if(channel.name === 'may-be-scammer' && channel.type === 'GUILD_TEXT'){
      targetChannelId = channel.id
    }
  })
  return targetChannelId
}

module.exports = { getTargetChannelId }
