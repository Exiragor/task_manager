import BaseController from './BaseController';
import Auth from '../models/Auth';
import { registrationMiddleware } from '../middlewares';
import * as hash from 'password-hash';

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

    public async registration(body, res) {
        try {
            if (!registrationMiddleware({
                name: body.name,
                last_name: body.last_name,
                password: body.password,
                email: body.email
            })) {
                await this.setFields({
                    status: false,
                    error: 'All fields be filled'
                });
                this.response(res, 'json');
                return false;
            }
            body.password = hash.generate(body.password);
            let result = await this.model.newUser(body);

            if (!result.status && result.errCode == 1062) {
                await this.setFields({
                    status: false,
                    error: 'This email is not available'
                });
                this.response(res, 'json');
                return false;
            }
            if (!result.status) return false;

            await this.setFields({
                status: true
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