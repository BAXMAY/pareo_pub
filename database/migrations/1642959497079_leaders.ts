import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Leaders extends BaseSchema {
  protected tableName = 'leaders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('care', 180).notNullable()
      table.text('profileImg').nullable()
      table.boolean('isSubmit').defaultTo(false).notNullable()
      table.timestamp('submitTime', { useTz: true }).nullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
