import * as knex from 'knex';


class Database {
    public tool: ITool;

    public constructor() {
        this.connection();
    }

    private connection() {
        this.tool = knex({
            client: 'mysql',
            connection: {
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'task_manager'
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