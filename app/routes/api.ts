import { Router } from 'express';
import controllers from '../controllers';

let router = Router();

router.get('/', (req, res) => {
    res.json({
        status: true,
        test: 'Hello',
        name: 'Alex'
    });
});

router.post('/user/get_name/', (req, res) => controllers.user.getName(req, res));

router.get('/list/', (req, res) => {
    res.json({
        status: true,
        list: [{id: 3, text: 'its a good idea'}, {id: 4, text: 'text from server!'}],
        last_id: 4
    });
});

router.get('/list/last/', (req, res) => {
    res.json({
        status: true,
        last_id: 4
    });
});

// router.get('/auth/login/', (req, res) => {
//     res.json({
//         status: false
//     });
// });

// router.post('/auth/login/', (req, res) => {
//     let data = req.body;
//     if (data.login == 'admin' && data.password == 'kappa')
//         res.json({
//             status: true,
//             username: data.login,
//             token: 'temp'
//         });
//     res.json({
//         status: false
//     });
// });

router.get(
    '/migration/create/',
    (req, res) => controllers.migration.createTable(
    ['users', 'tasks', 'groups', 'tasks2users'],
    res)
);

router.post('/auth/login/', (req, res) => controllers.auth.tryAuth(req, res));
router.post('/auth/registration/', (req, res) => controllers.auth.registration(req.body, res));

export default router;