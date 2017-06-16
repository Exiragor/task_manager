import MigrationController from './MigrationController';
import AuthController from './AuthController';
import UserController from './UserController';
import TaskController from './TaskController';

let controllers = {
    migration: new MigrationController(),
    auth: new AuthController(),
    user: new UserController(),
    task: new TaskController()
};

export default controllers;