import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Leaders extends BaseSchema {
  protected tableName = 'leaders'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('order_preference')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('order_preference')
    })
  }
}
