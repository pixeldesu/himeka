const Discord = require('discord.js')
const CommandManager = require('./lib/commandManager')
const DatabaseManager = require('./lib/databaseManager')

module.exports = class Himeka {
  constructor (config) {
    this.client = new Discord.Client()

    this.config = config
    this.commands = new CommandManager(config, this.client)
    this.database = new DatabaseManager()
  }

  run () {
    this.client.login(this.config.get('token'))
  }
}