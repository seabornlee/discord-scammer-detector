const getTargetUsernameList = async (client, guild) => {
  let usernameList = await guild.members.fetch()
  let targetUsernameList = []
  usernameList.forEach(u => {
    if (u.user.id !== client.user.id) {
      targetUsernameList.push(u.user.username)
    }
  })
  return targetUsernameList
}

module.exports = { getTargetUsernameList }
