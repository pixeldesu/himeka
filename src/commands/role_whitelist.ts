import MessageCommand from '../lib/commands/messageCommand'
import DatabaseManager from '../lib/databaseManager'
import ConfigManager from '../lib/configManager'

const database = new DatabaseManager()
const { Role } = database.models

export default class RoleWhitelistCommand extends MessageCommand {
  constructor(args: any[], config: ConfigManager) {
    super(args, config)

    this.requireCommandPrefix = true
    this.requireAdmin = true
    this.commandName = 'whitelist-role'
  }

  static commandName() {
    return 'whitelist-role'
  }

  static commandDescription() {
    return 'Enables a role to be self-assigned'
  }

  command() {
    const messageArguments = this.message.content
      .slice(this.config.get('prefix').length)
      .split(/ +/)

    messageArguments.shift()
    const roleName = messageArguments.join(' ')

    Role.findOne({ where: { name: roleName } })
      .then(role => {
        if (role === null) {
          this.message.channel.send('Role does not exist!')
          throw new Error()
        }

        if (role.whitelisted === true) {
          this.message.channel.send('Role is already whitelisted!')
          throw new Error()
        }

        role
          .updateAttributes({
            whitelisted: true
          })
          .then(() => {
            this.message.channel.send(
              `Role \`${roleName}\` is now whitelisted!`
            )
          })
      })
      .catch(Error, () => {})
  }
}
