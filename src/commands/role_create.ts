import RoleCreateCommand from '../lib/commands/roleCreateCommand'
import DatabaseManager from '../lib/databaseManager'

const database = new DatabaseManager()
const { Role } = database.models

export default class RoleCreateEventCommand extends RoleCreateCommand {
  static commandName() {
    return 'role-create-event'
  }

  command() {
    Role.findOrCreate({
      where: {
        name: this.role.name,
        snowflake: this.role.id,
        whitelisted: false
      }
    }).catch(Error, e => {
      console.log(e)
    })
  }
}
