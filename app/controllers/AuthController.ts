import BaseController from './BaseController';
import Auth from '../models/Auth';

class AuthController extends BaseController {

    private model: any;

    constructor() {
        super();
        this.model = new Auth(this.db);
    }

    public async tryAuth(req, res) {
        try {
            let user = await this.model.authUser(req.body.email, req.body.password);
            if (user)
                await this.setFields({
                    id: user.id,
                    token: user.token,
                    status: true
                });
            else
                await this.setFields({
                    status: false,
                    error: ''
                });

            this.response(res, 'json');
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default AuthController;