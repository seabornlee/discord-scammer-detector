const { isTargetChannel } = require('../../common')
const { getTheMessageSender } = require(
  '../../message/getTheMessageSender/getTheMessageSender.module')
const { isGuildManager } = require(
  '../../identityAuthentication/identityAuthentication.module')

const isRightChannelAndRole = (message) => {
  //first of all, check to see if the message was sent by the guild manager on the may-be-scammer channel
  const messageSender = getTheMessageSender(message)
  return isTargetChannel(message) && isGuildManager(messageSender)
}

const banTheScammers = (message, scammers) => {
  if (isRightChannelAndRole(message)) return
}

module.exports = { banTheScammers }
