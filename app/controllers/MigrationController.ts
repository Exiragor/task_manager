import { users, tasks, groups, tasks2users } from '../db_migrations';
import BaseController from './BaseController';

class MigrationController extends BaseController {

    protected migrations: IMigration = { users, tasks, groups, tasks2users };

    constructor() {
        super();
    }

    public async createTable(tables: [string], res: any) {
        for (let index in this.migrations) {
            for (let table of tables) {
                if (table == index)
                    this.migrations[index].create();
            }
        }
        await this.setFields('try create new table');
        this.response(res, 'send');
    }
}

export default MigrationController;

interface IMigration {
    users: {
        create: () => void
    }
    tasks: {
        create: () => void
    }
    groups: {
        create: () => void
    }
    tasks2users: {
        create: () => void
    }
}