const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = require('./config.json')
const { ignoreMessage } = require('./ignoreMessage.module')

const proxy = require('node-global-proxy').default
proxy.setConfig({
  http: 'http://127.0.0.1:7890',
  https: 'http://127.0.0.1:7890',
})
proxy.start()
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  }]

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    )

    console.log('Successfully reloaded application (/) commands.')
  }
  catch (error) {
    console.error(error)
  }
})()

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!')
  }
})

client.on('messageCreate', async (message) => {
  ignoreMessage(message)
  if (message.mentions.has(client.user.id)) {
   await message.reply("Hello");
  }
})

client.login(BOT_TOKEN)
