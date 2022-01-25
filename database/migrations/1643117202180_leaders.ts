import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Leaders extends BaseSchema {
  protected tableName = 'leaders'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('line_name')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('line_name')
    })
  }
}
