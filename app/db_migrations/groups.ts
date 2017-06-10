import db from '../models/Database';

export default async function createGroups() {
    try {
        await db.tool.schema.createTableIfNotExists('groups', function (table) {
            table.increments();
            table.string('name', 100);
            table.string('type', 50);
            table.timestamps();
        });
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}


