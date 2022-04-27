const getTargetUserNameList = async (client, guild) => {
  //get all username of the guild,except this bot
  let userNameList = await guild.members.fetch()
  let targetUserNameList = []
  userNameList.forEach(u => {
    if (u.user.id !== client.user.id) {
      targetUserNameList.push(u.user.username)
    }
  })
  return targetUserNameList
}

module.exports = { getTargetUserNameList }
