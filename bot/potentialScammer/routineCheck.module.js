const { getBotAllGuilds } = require(
  './getBotAllGuilds')
const { fetchTargetChannel } = require(
  './fetchTargetChannel.module')
const { getMembersUsername } = require('./getMembersUsername.module')

const routineCheck = async (client) => {
  const guilds = await getBotAllGuilds(client)
  guilds.each(async guild => {
      const targetChannel = await fetchTargetChannel(guild)
      const membersUsername = await getMembersUsername(guild, client)
      targetChannel.send(membersUsername.toString())
    },
  )
}
module.exports = { routineCheck }
