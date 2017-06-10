class User {
    private db: any;

    constructor(db) {
        this.db = db;
    }

    public async getName(id): Promise<string> {
        try {
            let result =  await this.db.tool('users')
                .where('id', id)
                .select('name');
            return result[0].name;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default User;