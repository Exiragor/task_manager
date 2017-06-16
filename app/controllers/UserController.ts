import BaseController from './BaseController';
import UserModel from '../models/User';

class UserController extends BaseController {
    private model: any;

    constructor() {
        super();
        this.model = new UserModel(this.db);
    }

    public async getInfo(req, res) {
        try {
            if (req.params.id != req.tokenInfo.id) {
                await this.setFields({
                    status: false,
                    message: 'access denied!'
                });
                this.response(res, 'json');
                return false;
            }

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