//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../build/server');
let should = chai.should();

chai.use(chaiHttp);
//Наш основной блок
describe('Users', () => {
    /*
     * Тест для /GET
     */
    describe('/GET user_name', () => {
        it('it should GET name of user', (done) => {
            chai.request(server)
            .post('/api/user/get_name/')
            .send({
                id: 1,
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFsZXgiLCJwYXNzd29yZCI6InNoYTEkYjg4MThkMjMkMSQxNzFjZTA5NjliMzYzOWJjY2QwMzIzODIwODE3ZWVjYTYwNmQ0NDRkIiwiaWF0IjoxNDk3MzUzNTA5LCJleHAiOjE0OTczNTQ5NDl9.nOpoChKyWe53EsnTP4vTHvWWU0nglKFSn8SGIQJcmEY'
            })
            .end((err, res) => {
            // res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('name');
            done();
        });
    });
});

});