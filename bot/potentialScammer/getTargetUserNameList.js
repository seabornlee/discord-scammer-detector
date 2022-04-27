const getTargetUsernameList = async (client, guild) => {
  //get all username of the guild,except this bot
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
