//Используем тестовую бд
process.env.NODE_ENV = 'test';

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../build/server');
let should = chai.should();

let token = '';
let email = 'test@test';
let pass = 'testpass';
chai.use(chaiHttp);
//Наш основной блок
describe('Users', () => {
    /*
     * Регистрация
     */

    registr().then(res => {
        describe('/GET user_name', () => {
            it('it should GET user info', (done) => {
                chai.request(server)
                    .get('/api/user/')
                    .param({})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').equal(true);
                        done();
                    });
            });
        });
    });

    /*
     * Тест для /GET
     */

});


function registr() {
    return new Promise((resolve, reject) => {
        describe('Auth user', () => {
            it('it should auth user', (done) => {
                chai.request(server)
                    .post('/auth/registration/')
                    .send({
                        email: email,
                        password: pass,
                        name: 'test',
                        last_name: 'testing',
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').equal(true);
                        done();
                        resolve(true);
                    })
            })
        });
    });
}