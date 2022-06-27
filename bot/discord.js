const { BOT_TOKEN } = require('./config.json')
const { createChannelSayHi } = require(
  './guild/channel/channelCreate/createChannelSayHi.module')
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

useProxy()

//test the bot has 'applications.commands' scope

useCommandsCreate()

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
  //the bot shouldn't has reaction for every message
  ignoreMessage(message)
  messageReaction(message)
})

client.on('guildCreate', async (guild) => {
  try {
    //when the bot first join the guild,
    //It should create a name:"may-be-scammer",type:"GUILD_TEXT" channel
    //and then send a hello message to this channel
    //PS:Verify that the user has given the permission
    await createChannelSayHi(guild)
  }
  catch (err) {
    console.log(err)
  }

})

client.login(BOT_TOKEN)



