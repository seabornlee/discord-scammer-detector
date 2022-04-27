const getPotentialScammer = async (message) => {
  if (message.mentions.has(message.client.user.id)) {
    let userList = []
    // get all username of the guild,except this bot
    await message.guild.members.fetch().then(res => {
      res.forEach(u => {
        if (u.user.id !== message.client.user.id) {
          userList.push(u.user.username)
        }
      })
    })
    await message.channel.send(userList.toString())
  }
}
module.exports = { getPotentialScammer }
