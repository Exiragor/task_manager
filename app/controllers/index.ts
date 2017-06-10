import MigrationController from './MigrationController';
import AuthController from './AuthController';
import UserController from './UserController';

let controllers = {
    migration: new MigrationController(),
    auth: new AuthController(),
    user: new UserController()
};

export default controllers;