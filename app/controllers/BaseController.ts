import db from "../models/Database";

class BaseController {

    protected db:any = db;
    protected model: any;
    protected fields: IFields = {
        str: null,
        obj: null
    };

    protected setFields(fields): Promise<string> {
        return new Promise((resolve) => {
            if (typeof fields == "string")
                this.fields.str = fields;
            if (typeof fields == "object")
                this.fields.obj = fields;
            resolve('');
        });

    }

    protected response(res: any, typeOfResponse: string) {
        switch (typeOfResponse) {
            case 'json':
                res.json(this.fields.obj);
                break;
            case 'send':
                res.send(this.fields.str);
                break;
            default:
                res.send('nothing to return');
        }
    }

    protected async checkToken(id, token): Promise<true|false> {
        try {
            let result = await this.db.tool('users')
                .where('id', id)
                .select('token');

            return result[0].token == token;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    protected async checkParamsId(reqId, tokenId, res): Promise<false|true> {
        if (reqId != tokenId) {
            await this.setFields({
                status: false,
                message: 'access denied!'
            });
            this.response(res, 'json');
            return false;
        }
        return true;
    }
}

export default BaseController;

interface IFields {
    str: string,
    obj: object
}