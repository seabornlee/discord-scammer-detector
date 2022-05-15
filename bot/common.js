const isTargetChannel = (message) => {
  return message.channel.name === 'may-be-scammer'
}

const isGuildOwner = (member) => {
  return member.user.id === member.guild.ownerId
}

module.exports = { isTargetChannel, isGuildOwner }
