const ignoreMessage = (message) => {
  //These are situations where the bot should not reply
  if (message.author.bot) return false;
  if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;

}
module.exports = { ignoreMessage }
