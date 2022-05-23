const { fetchMatchConditionMembers } = require(
  './fetchMatchConditionMembers.module')

const getMembersKeyInformation = (members) => {
  let membersKeyInformation = new Map()
  members.each(member => {
    membersKeyInformation.set(
      member.user.id, {
        username: member.user.username,
        discriminator: member.user.discriminator
      })
  })
  return membersKeyInformation
}

const getMembersUsername = async (guild, client) => {
  const members = await fetchMatchConditionMembers(guild, client)
  const membersKeyInformation = getMembersKeyInformation(members)
  let membersUsername = []
  for (let member of membersKeyInformation.values()) {
    membersUsername.push(member.username+"#"+member.discriminator)
  }
  return membersUsername
}

module.exports = { getMembersUsername }
