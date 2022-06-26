const getAllMembers = (guild) => {
  return guild.members.fetch()
}

const isBotSelf = (theBotSelf, Member) => {
  return (theBotSelf.user.id === Member.user.id)
}

const filterNotBotSelfMembers = async (guild, theBotSelf) => {
  const allMembers = await getAllMembers(guild)
  return allMembers.filter(member => !isBotSelf(member, theBotSelf))
}

module.exports = { filterNotBotSelfMembers }
