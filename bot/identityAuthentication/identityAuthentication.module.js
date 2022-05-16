const { Permissions } = require('discord.js')
const { isGuildOwner } = require('../common')

const isGuildManager = (member) => {
  //if the member is this guild owner that he can do anything
  //if not,check the member has the permissions
  if (isGuildOwner(member)) return isGuildOwner(member)
  return isHasPermissions(member, permissions)
}

const permissions = [
  Permissions.FLAGS.BAN_MEMBERS,
]

const isHasPermissions = (member, permissions) => {
  return member.permissions.has([permissions])
}

module.exports = { isGuildManager }
