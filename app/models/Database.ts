import * as knex from 'knex';
import conf from '../configs/config.dev';

class Database {
    public tool: ITool;

    public constructor() {
        this.connection();
    }

    private connection() {
        this.tool = knex({
            client: 'mysql',
            connection: {
                host: conf.db.hostname,
                user: conf.db.username,
                password: conf.db.password,
                database: conf.db.name
            }
        });
    }

}

let db = new Database();

export default db;

interface ITool {
    (table: string): {
        where: (obj?: any, field?: string, condition?: string, value?: string|number) => {
            update: any
        },
    },
    schema?: {
        createTableIfNotExists: ( name: string, tableHandle: (table: any) => void ) => void
    }
}