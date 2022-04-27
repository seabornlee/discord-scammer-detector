const autoCreateChannel = (server) => {
  server.channels.create('may-be-scammer', {
      type: 'GUILD_TEXT',
      permissionOverwrites: [
        {
          id: server.id,
          allow: ['VIEW_CHANNEL'],
        },
      ],
    },
  ).then(channel => {channel.send('welcome to use scammer-detector-bot!')})
}

module.exports = { autoCreateChannel }
