'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostitSchema extends Schema {
  up () {
    this.create('postits', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('content', 240).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('postits')
  }
}

module.exports = PostitSchema
