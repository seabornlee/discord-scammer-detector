const { BOT_TOKEN, CLIENT_ID, GUILD_ID, PROXY_URL } = require('./config.json')
const { ignoreMessage } = require(
  './message/ignoreMessage/ignoreMessage.module')
const { useProxy } = require('./useProxy/useProxy')
const { useCommandsCreate } = require('./interaction/command/commandCreate')
const { banTheScammers } = require(
  './aboutScammers/banTheScammers/banTheScammers.module')
//start using proxy
useProxy(PROXY_URL)

//create commands
useCommandsCreate(BOT_TOKEN, CLIENT_ID, GUILD_ID)

const { Client, Intents } = require('discord.js')
const client = new Client(
  {
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_BANS],
  })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!')
  }

  if (interaction.commandName === 'hello') {
    await interaction.reply('Nice!')
  }
})
client.on('messageCreate', async (message) => {
  ignoreMessage(message)
  if (isMessageMentionsTheBot(message,client)) {
    await message.reply('Hello')
    banTheScammers(message)
  }
})

const isMessageMentionsTheBot = (message,theBot) => {
  return message.mentions.has(theBot.user.id)
}

client.login(BOT_TOKEN)
