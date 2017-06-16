import BaseController from './BaseController';
import TaskModel from '../models/Task';
import {isUndefined} from "util";

class TaskController extends BaseController {

    constructor() {
        super();
        this.model = new TaskModel(this.db);
    }

    public async userTasks(req, res) {
        try {
            if (!await this.checkParamsId(req.params.id, req.tokenInfo.id, res))
                return false;

            let result = await this.model.getUserTasks(req.params.id);

            res.send(result);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async addTask(req, res) {
        try {
            if (!await this.checkParamsId(req.body.id, req.tokenInfo.id, res))
                return false;

            let task = {
                name: req.body.name,
                description: req.body.description,
                deadline: new Date(req.body.date),
                status: req.body.status,
                type: 'self'
            };
            await this.model.addUserTask(req.body.id, task);

            await this.setFields({
                status: true
            });
            this.response(res, 'json');
        }
        catch (err) {
            await this.setFields({
                status: false,
                error: err
            });
            this.response(res, 'json');
        }
    }

    public async updateTask(req, res) {
        try {
            if (!await this.checkParamsId(req.body.id, req.tokenInfo.id, res))
                return false;
            let task: any = {};

            (req.body.name != '' && req.body.name != null && req.body.name != undefined)
                ? task.name = req.body.name : false;
            (req.body.description != '' && req.body.description != null && !req.body.description.isUndefined)
                ? task.description = req.body.description : false;
            (req.body.date != '' && req.body.date != null && req.body.date != undefined)
                ? task.deadline = new Date(req.body.date) : false;
            (req.body.status != '' && req.body.status != null && req.body.status != undefined)
                ? task.name = req.body.name : false;

            await this.model.updateTask(req.params.id, task);

            await this.setFields({
                status: true
            });
            this.response(res, 'json');
        }
        catch (err) {
            await this.setFields({
                status: false,
                error: err
            });
            this.response(res, 'json');
        }
    }

    public async deleteTask(req, res) {
        try {
            if (!await this.checkParamsId(req.body.id, req.tokenInfo.id, res))
                return false;

            await this.model.deleteTask(req.params.id);
            await this.setFields({
                status: true
            });
            this.response(res, 'json');
        }
        catch (err) {
            await this.setFields({
                status: false,
                error: err
            });
            this.response(res, 'json');
        }
    }
}

export default TaskController;