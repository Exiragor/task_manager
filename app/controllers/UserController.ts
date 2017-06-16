import BaseController from './BaseController';
import UserModel from '../models/User';

class UserController extends BaseController {

    constructor() {
        super();
        this.model = new UserModel(this.db);
    }

    public async getInfo(req, res) {
        try {
            if (!await this.checkParamsId(req.params.id, req.tokenInfo.id, res))
                return false;

            let user = await this.model.getInfo(req.params.id);

            await this.setFields({
                status: true,
                user
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