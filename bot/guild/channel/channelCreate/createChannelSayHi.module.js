const {
  createChannel,
  fetchUserPreferredHelloMessage,
  getUserPreferredLocale,
  sendMessage,
} = require(
  '../../../common')
const createChannelSayHi = async (guild) => {
  const channel = await createChannel(guild, 'may-be-scammer', 'GUILD_TEXT')
  const userLocal = await getUserPreferredLocale(guild)
  const helloMessage = await fetchUserPreferredHelloMessage(userLocal)
  await sendMessage(channel, helloMessage)
}

module.exports = { createChannelSayHi }
