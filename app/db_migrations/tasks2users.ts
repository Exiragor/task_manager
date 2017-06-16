import db from '../models/Database';

export default async function createTasks2users() {
    try {
        await db.tool.schema.createTableIfNotExists('tasks2users', function (table) {
            table.integer('task_id');
            table.integer('user_id');
            table.integer('group_id');
            table.string('type', 50);
            table.primary(['task_id', 'user_id']);
        });
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}


