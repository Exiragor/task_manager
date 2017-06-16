import BaseController from './BaseController';
import TaskModel from '../models/Task';

class TaskController extends BaseController {

    constructor() {
        super();
        this.model = new TaskModel(this.db);
    }

    public async userTasks(req, res) {
        try {
            if (!await this.checkParamsId(req.params.id, req.tokenInfo.id, res))
                return false;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default TaskController;