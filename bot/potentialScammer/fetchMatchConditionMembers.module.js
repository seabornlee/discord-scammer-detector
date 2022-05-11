const getAllMembers = (guild) => {
  return guild.members.fetch()
}

const isBotSelf = (theBotSelf, Member) => {
  return (theBotSelf.user.id === Member.user.id)
}

const filterMatchConditionMembers = (members, theBotSelf) => {
  return members.filter(member => !isBotSelf(member, theBotSelf))
}

const fetchMatchConditionMembers = async (guild, theBotSelf) => {
  const allMembers = await getAllMembers(guild)
  return filterMatchConditionMembers(allMembers, theBotSelf)
}

module.exports = { fetchMatchConditionMembers }
