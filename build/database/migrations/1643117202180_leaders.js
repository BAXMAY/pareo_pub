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
        this.schema.alterTable(this.tableName, (table) => {
            table.string('line_name');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('line_name');
        });
    }
}
exports.default = Leaders;
//# sourceMappingURL=1643117202180_leaders.js.map