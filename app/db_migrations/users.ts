import db from '../models/Database';

export default async function createUsers() {
    try {
        await db.tool.schema.createTableIfNotExists('users', function (table) {
            table.increments();
            table.string('name', 100);
            table.string('last_name', 100);
            table.string('email', 120).unique();
            table.string('phone', 100);
            table.string('token');
            table.string('password', 120);
            table.timestamps();
        });
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}


