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
            if (req.body.id != req.tokenInfo.id) {
                await this.setFields({
                    status: false,
                    message: 'access denied!'
                });
                this.response(res, 'json');
                return false;
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