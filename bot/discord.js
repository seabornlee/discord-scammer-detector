const { BOT_TOKEN, CLIENT_ID, GUILD_ID, PROXY_URL } = require('./config.json')
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

useProxy(PROXY_URL)

//test the bot has 'applications.commands' scope
useCommandsCreate(BOT_TOKEN, CLIENT_ID, GUILD_ID)

const { Client, Intents } = require('discord.js')
const client = new Client(
  { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

})

const getGuilds = () => {
  return client.guilds.fetch()
}
const setCommandsForEveryGuild = async () => {
  try {
    const guilds = await getGuilds()
    guilds.each(guild => {
      useCommandsCreate(BOT_TOKEN, CLIENT_ID, guild.id)
    })
  }
  catch (e) {
    console.log(e)
  }
}

setCommandsForEveryGuild()
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return
  commandReaction(interaction)
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
