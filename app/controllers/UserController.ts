import BaseController from './BaseController';
import UserModel from '../models/User';

class UserController extends BaseController {
    private model: any;

    constructor() {
        super();
        this.model = new UserModel(this.db);
    }

    public async getName(req, res) {
        try {
            if (!await this.checkToken(req.body.id, req.body.token)) {
                await this.setFields({
                    status: false,
                    error: 'Access denied!'
                });
                this.response(res, 'json');
            }
            let name = await this.model.getName(req.body.id);

            await this.setFields({
                status: true,
                name
            });
            this.response(res, 'json');
        }
        catch(err) {
            console.log(err);
            throw err;
        }
    }
}

export default UserController;