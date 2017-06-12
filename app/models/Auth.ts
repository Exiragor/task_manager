import * as hash from 'password-hash';
import * as jwt from 'jsonwebtoken';
import * as conf from 'config';

class Auth {
    private dictionary: [string];
    private db: any;
    private tableName: string = 'users';

    constructor(db) {
        this.db = db;
        this.createSymbols();
    }

    public async authUser(email: string, pass: string): Promise<false|{id: number, token: string}> {
        try {
            let res = await this.db.tool(this.tableName).where({
                email: email
            }).select('id', 'name', 'password');

            if (res[0] == null)
                return false;
            if (!hash.verify(pass, res[0].password))
                return false;
            let user = res[0];
            let token = '';

            if (user.token == null) {

                token = jwt.sign(user, conf.get('secretKey'), {
                    expiresIn: 1440
                });

                // await this.db.tool(this.tableName)
                //     .where('id', user.id)
                //     .update({
                //         token: token
                //     });
            }

            return {
                id: user.id,
                token: token
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    public async newUser(body) {
        try {
            await this.db.tool(this.tableName)
                .insert({
                    name: body.name,
                    last_name: body.last_name,
                    email: body.email,
                    phone: body.phone,
                    password: body.password,
                    created_at: this.db.tool.fn.now()
                });
            return {
                status: true
            }
        }
        catch (err) {
            return {
                status: false,
                errCode: err.errno
            }
        }
    }

    private createSymbols() {
        let tempArr: [string] = [''];
        let sym1: string = 'abcdefghijklmnopqrstuvwxyz';
        let sym2: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let sym3: string = '!@#$%^&*()';
        for (let item of sym1) {
            tempArr.push(item);
        }
        for (let item of sym2) {
            tempArr.push(item);
        }
        for (let item of sym3) {
            tempArr.push(item);
        }

        this.dictionary = tempArr;
    }
}


export default Auth;