const ignoreMessage = (message) => {
  if (message.author.bot) return false;
  if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;

}
module.exports = { ignoreMessage }
