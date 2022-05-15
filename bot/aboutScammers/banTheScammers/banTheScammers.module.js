const { isTargetChannel } = require('../../common')
const { getTheMessageSender } = require(
  '../../message/getTheMessageSender/getTheMessageSender.module')
const { identityAuthentication } = require(
  '../../identityAuthentication/identityAuthentication.module')

const banTheScammers = (message) => {
  //first of all, check to see if the message was sent by the guild manager on the may-be-scammer channel
  isTargetChannel(message)
  const messageSender = getTheMessageSender(message)
  identityAuthentication(messageSender)
}

module.exports = { banTheScammers }
