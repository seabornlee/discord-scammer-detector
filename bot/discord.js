const { BOT_TOKEN, CLIENT_ID, GUILD_ID, PROXY_URL } = require('./config.json')
const { ignoreMessage } = require(
  './message/ignoreMessage/ignoreMessage.module')
const { useProxy } = require('./useProxy/useProxy')
const { useCommandsCreate } = require('./interaction/command/commandCreate')

//start using proxy
useProxy(PROXY_URL)

//create commands
useCommandsCreate(BOT_TOKEN, CLIENT_ID, GUILD_ID)

const { Client, Intents, Permissions } = require('discord.js')
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
  if (message.mentions.has(client.user.id)) {
    await message.reply('Hello')
  }
  await banTheScammers(message)
})

const banTheScammers = (message) => {
  //first of all, check to see if the message was sent by the guild manager on the may-be-scammer channel
  isTargetChannel(message)
  const messageSender = getTheMessageSender(message)
  identityAuthentication(messageSender)
}

const identityAuthentication = (member) => {
  //if the member is this guild owner that he can do anything
  //if not,check the member has the permissions
  if (isGuildOwner(member)) return isGuildOwner(member)
  return isGuildManager(member)
}
const isTargetChannel = (message) => {
  return message.channel.name === 'may-be-scammer'
}

const isGuildManager = (member) => {
  return isHasBanMembersPermissions(member)
}

const isGuildOwner = (member) => {
  return member.user.id === member.guild.ownerId
}

const isHasBanMembersPermissions = (member) => {
  return member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
}

const getTheMessageSender = (message) => {
  return message.member
}

client.login(BOT_TOKEN)
