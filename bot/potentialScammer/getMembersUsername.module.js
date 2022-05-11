const { fetchMatchConditionMembers } = require(
  './fetchMatchConditionMembers.module')

const getMembersKeyInformation = (members) => {
  let membersKeyInformation = new Map()
  members.each(member => {
    membersKeyInformation.set(member.user.username, member.user.id)
  })
  return membersKeyInformation
}

const getMembersUsername = async (guild, client) => {
  const members = await fetchMatchConditionMembers(guild, client)
  const membersKeyInformation = getMembersKeyInformation(members)
  let membersUsername = []
  for (let key of membersKeyInformation.keys()) {
    membersUsername.push(key)
  }
  return membersUsername
}

module.exports = { getMembersUsername }
