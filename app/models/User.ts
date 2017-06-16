class User {
    private db: any;

    constructor(db) {
        this.db = db;
    }

    public async getInfo(id): Promise<string> {
        try {
            let result =  await this.db.tool('users')
                .where('id', id)
                .select('id', 'name', 'last_name', 'email', 'phone', 'created_at', 'updated_at');
            return result[0];
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default User;