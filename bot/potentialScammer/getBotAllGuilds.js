const getBotAllGuilds = (client) => {
  return client.guilds.cache
}
module.exports = { getBotAllGuilds }
