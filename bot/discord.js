const { BOT_TOKEN, CLIENT_ID, GUILD_ID, PROXY_URL } = require('./config.json')
const { ignoreMessage } = require(
  './message/ignoreMessage/ignoreMessage.module')
const { useProxy } = require('./useProxy/useProxy')
const { useCommandsCreate } = require(
  './interaction/command/commandCreate/commandCreate')
const { commandReaction } = require(
  './interaction/command/commandReaction/commandReaction')
const { autoCreateChannel } = require(
  './guild/channel/channelCreate/autoCreateChannel.module')
const { messageReaction } = require(
  './message/messageReaction/messageReaction.module')
const { getBotIntegralGuilds } = require(
  './potentialScammer/getBotIntegralGuilds')
const { getPotentialScammer } = require(
  './potentialScammer/getPotentialScammer')

//start using proxy
useProxy(PROXY_URL)

//create commands
useCommandsCreate(BOT_TOKEN, CLIENT_ID, GUILD_ID)

const { Client, Intents } = require('discord.js')
const { getTargetChannelId } = require('./potentialScammer/getTargetChannelId')
const client = new Client(
  {
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS],
  })

client.on('ready', (message) => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async interaction => {
  //it is should a command
  if (!interaction.isCommand()) return
  //What should be done after the command is executed
  await commandReaction(interaction)
})

client.on('messageCreate', async (message) => {
  //message that should be ignore
  ignoreMessage(message)
  //The reaction to  particular messages
  await messageReaction(message)
  //get all username of the guild,except this bot
  // await getPotentialScammer(message)
})

client.on('guildCreate', async (server) => {
  try {
    //after the bot is deploy,automatic create a new channel
    await autoCreateChannel(server)
  }
  catch (err) {
    console.log(err)
  }
})

client.login(BOT_TOKEN)

const potentialScammerModule = async (client) => {
  const guildList = await getBotIntegralGuilds(client)
  for (let guild of guildList) {
    const targetChannelId = await getTargetChannelId(guild)
  }
}
potentialScammerModule(client)

