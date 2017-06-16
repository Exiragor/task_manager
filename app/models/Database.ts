import * as knex from 'knex';
import * as conf from 'config';

class Database {
    public tool: ITool;

    public constructor() {
        this.connection();
    }

    private connection() {
        this.tool = knex({
            client: 'mysql',
            connection: {
                host: conf.get('db.hostname'),
                user: conf.get('db.username'),
                password: conf.get('db.password'),
                database: conf.get('db.name')
            }
        });
    }

}

let db = new Database();

export default db;

interface ITool {
    (table?: string): {
        where?: (obj?: any, field?: string, condition?: string, value?: string|number) => {
            update?: any,
            select?: any
        },
    },
    schema?: {
        createTableIfNotExists: ( name: string, tableHandle: (table: any) => void ) => void
    }
}