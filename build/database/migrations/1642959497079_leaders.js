"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Leaders extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'leaders';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('care', 180).notNullable();
            table.text('profileImg').nullable();
            table.boolean('isSubmit').defaultTo(false).notNullable();
            table.timestamp('submitTime', { useTz: true }).nullable();
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Leaders;
//# sourceMappingURL=1642959497079_leaders.js.map