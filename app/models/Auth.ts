class Auth {
    private dictionary: [string];
    private db: any;

    constructor(db) {
        this.db = db;
        this.createSymbols();
    }

    createUserToken(name) {
        let token = '';
        for (let i = 0; i < 60; i++) {
            let random = Math.floor(Math.random() * (62 - 1)) + 1;
            token += this.dictionary[random];
        }
        token += name.split("").reverse().join("");
        return token;
    }

    public async authUser(email: string, pass: string): Promise<false|{id: number, token: string}> {
        try {
            let res = await this.db.tool('users').where({
                email: email,
                password: pass
            }).select('id', 'token', 'name');

            if (res[0] == null)
                return false;
            let user = res[0];

            let token = user.token;
            if (user.token == null) {
                token = this.createUserToken(user.name);
                await this.db.tool('users')
                    .where('id', user.id)
                    .update({
                        token: token
                    });
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



    createSymbols() {
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