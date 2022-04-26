const autoCreateChannelModule = (server) => {
  server.channels.create('may-be-scammer', {
      type: 'GUILD_TEXT',
      permissionOverwrites: [
        {
          id: server.id,
          allow: ['VIEW_CHANNEL'],
        },
      ],
    },
  )
}

module.exports = { autoCreateChannel: autoCreateChannelModule }
