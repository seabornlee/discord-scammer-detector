const { BOT_TOKEN, CLIENT_ID, GUILD_ID, PROXY_URL } = require('./config.json')
const { ignoreMessage } = require(
  './message/ignoreMessage/ignoreMessage.module')
const { useProxy } = require('./useProxy/useProxy')
const { useCommandsCreate } = require('./interaction/command/commandCreate')

//start using proxy
useProxy(PROXY_URL)

//create commands
useCommandsCreate(BOT_TOKEN, CLIENT_ID, GUILD_ID)

const { Client, Intents } = require('discord.js')
const client = new Client(
  { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

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
})

client.on('guildCreate', async (server) =>{
  try {
    await server.channels.create('may-be-scammer',{
        type: 'GUILD_TEXT',
        permissionOverwrites: [
          {
            id: server.id,
            allow: ['VIEW_CHANNEL']
          },
        ],
      }
      )
  }
  catch (err) {
    console.log(err)
  }
})
client.login(BOT_TOKEN)
