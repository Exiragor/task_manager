import db from '../models/Database';

export default async function createTasks() {
    try {
        await db.tool.schema.createTableIfNotExists('tasks', function (table) {
            table.increments();
            table.string('name', 200);
            table.text('description');
            table.dateTime('deadline');
            table.string('status', 50);
            table.timestamps();
        });
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}


