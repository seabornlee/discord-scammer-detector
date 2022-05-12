const { BOT_TOKEN, CLIENT_ID, GUILD_ID, PROXY_URL } = require('./config.json')
const { ignoreMessage } = require(
  './message/ignoreMessage/ignoreMessage.module')
const { useProxy } = require('./useProxy/useProxy')
const { useCommandsCreate } = require(
  './interaction/command/commandCreate/commandCreate')
const { commandReaction } = require(
  './interaction/command/commandReaction/commandReaction')
const { messageReaction } = require(
  './message/messageReaction/messageReaction.module')
const { routineCheck } = require(
  './potentialScammer/routineCheck.module')

useProxy(PROXY_URL)

useCommandsCreate(BOT_TOKEN, CLIENT_ID, GUILD_ID)

const { Client, Intents } = require('discord.js')
const client = new Client(
  {
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS],
  })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  setInterval(function () {
    //May fail due to network problems
    try {
      routineCheck(client)
    }
    catch (e) {
      console.log(e)
    }
  }, 5000)
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return
  await commandReaction(interaction)
})

client.on('messageCreate', async (message) => {
  ignoreMessage(message)
  await messageReaction(message)
})

client.login(BOT_TOKEN)



