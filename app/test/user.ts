

//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Наш основной блок
describe('Users', () => {
    /*
     * Тест для /GET
     */
    describe('/GET user_name', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/api/user/get_name/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});