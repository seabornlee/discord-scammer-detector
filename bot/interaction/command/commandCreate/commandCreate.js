const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'hello',
    description: 'Replies with Nice!',
  },
  {
    name: 'whitelist',
    description: 'Display the whitelist',
  }
  ]

const useCommandsCreate = (BOT_TOKEN, CLIENT_ID, GUILD_ID) => {
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
}

module.exports = { useCommandsCreate }
