import createUsers from './users';
import createTasks from './tasks';
import createGroups from './groups';
import createTasks2users from './tasks2users';

export let users = {
    create: createUsers
};
export let tasks = {
    create: createTasks
};
export let groups = {
    create: createGroups
};
export let tasks2users = {
    create: createTasks2users
};

export default 'All migrations here';

