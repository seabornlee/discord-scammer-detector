const { getBotIntegralGuilds } = require(
  './getBotIntegralGuilds')
const { getTargetChannelId } = require('./getTargetChannelId')
const { getTargetUsernameList } = require(
  './getTargetUsernameList')

const potentialScammerModule = async (client) => {
  const guildList = await getBotIntegralGuilds(client)
  for (let guild of guildList) {
    const targetChannelId = await getTargetChannelId(guild)
    if (targetChannelId === undefined) continue
    const usernameList = await getTargetUsernameList(client, guild)
    const channel = await guild.channels.fetch(targetChannelId)
    channel.send(usernameList.toString())
  }
}
module.exports = { potentialScammerModule }
