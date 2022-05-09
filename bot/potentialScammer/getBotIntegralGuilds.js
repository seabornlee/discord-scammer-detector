const getBotGuildsId = async (client) => {
  let guildIdList = []
  const roughlyGuildList = await client.guilds.fetch()
  await roughlyGuildList.forEach(guild => guildIdList.push(guild.id))
  return guildIdList
}

const getBotIntegralGuilds = async (client) => {
  let guildIdList = await getBotGuildsId(client)
  let integralGuildList = []
  for (let guildId of guildIdList) {
    let integralGuild = await client.guilds.fetch(guildId)
    integralGuildList.push(integralGuild)
  }
  return integralGuildList
}

module.exports = { getBotIntegralGuilds }
