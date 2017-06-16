class Task {
    private db: any;

    constructor(db) {
        this.db = db;
    }

    public async getUserTasks(userId: number) {
        try {
            return await this.db.tool('users')
                .where('users.id', userId)
                .leftJoin('tasks2users', 'users.id', 'tasks2users.user_id')
                .leftJoin('tasks', 'tasks2users.task_id', 'tasks.id')
                .select('tasks.id', 'tasks.name', 'tasks2users.type', 'tasks.description', 'tasks.deadline', 'tasks.status');
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async addUserTask(userId: number, task: any) {
        try {
            let result = await this.db.tool('tasks')
                .insert({
                    name: task.name,
                    description: task.description,
                    deadline: task.deadline,
                    status: task.status
                });

            let id = result[0];

            await this.db.tool('tasks2users')
                .insert({
                    task_id: id,
                    user_id: userId,
                    type: task.type
                });
            return true;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async updateTask(id, task) {
        try {
            await this.db.tool('tasks')
                .where({id: id})
                .update(task);
            return true;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    public async deleteTask(id) {
        try {
            await this.db.tool('tasks')
                .where({id: id})
                .del();
            await this.db.tool('tasks2users')
                .where({task_id: id})
                .del();

            return true;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default Task;