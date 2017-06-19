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

    public async authUser(email: string, pass: string): Promise<false|{id: number, token: string, refreshToken: string, key: string}> {
        try {
            let res = await this.db.tool(this.tableName).where({
                email: email
            }).select('id', 'name', 'password');

            if (res[0] == null)
                return false;
            if (!hash.verify(pass, res[0].password))
                return false;
            let user = res[0];
            let date = new Date().toString();

            let secretKey = user.name + email + date;
            let infoUser = {
                id: user.id,
                name: user.name,
                role: 'user',
                secretKey
            };

            let token = jwt.sign(infoUser, conf.get('secretKey'), {
                expiresIn: 174800
            });

            let refreshToken = jwt.sign({
                id: user.id,
                create_at: date,
                secretKey
            },conf.get('secretKey'), {expiresIn: 999999999999});
            await this.db.tool(this.tableName).update({
                secretKey
            }).where({ id: user.id});

            return {
                id: user.id,
                token: token,
                refreshToken: refreshToken,
                key: date
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

    public async updateUserTokens(id: number, oldRefreshToken: string, key: string): Promise<false|{token: string, refreshToken: string, key: string}> {
        let info: any = {};
        let user:any = {};

        async function decodeToken(info) {
            return new Promise((resolve, reject) => {
                jwt.verify(oldRefreshToken, conf.get('secretKey'), function (err, decoded) {
                    if (err) reject(err);
                    resolve(decoded);
                });
            });
        }

        info = await decodeToken(info);
        if (info.id != id)
            return false;
        let result = await this.db.tool(this.tableName)
            .where({id: id})
            .select('name', 'email', 'secretKey');

        if (!result[0])
            return false;
        else
            user = result[0];
        if (info.create_at != key)
            return false;

        if (user.secretKey != info.secretKey)
            return false;

        let infoUser = {
            id: id,
            name: user.name,
            role: 'user',
            secretKey: user.secretKey
        };

        let token = jwt.sign(infoUser, conf.get('secretKey'), {
            expiresIn: 174800
        });
        let date = new Date().toString();
        let refreshToken = jwt.sign({
            id: id,
            create_at: date,
            secretKey: user.secretKey
        },conf.get('secretKey'), {expiresIn: 999999999999});

        // await this.db.tool(this.tableName).update({
        //     last_refresh: date
        // }).where({ id: id});

        return {
            token: token,
            refreshToken: refreshToken,
            key: date
        }
    }
}


export default Auth;