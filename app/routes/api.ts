import { Router } from 'express';
import controllers from '../controllers';
import {checkTokenMiddleware} from '../middlewares';

let router = Router();

router.get(
    '/migration/create/',
    (req, res) => controllers.migration.createTable(
    ['users', 'tasks', 'groups', 'tasks2users'],
    res)
);

let authRouter = Router();
authRouter.post('/login/', (req, res) => controllers.auth.tryAuth(req, res));
authRouter.post('/registration/', (req, res) => controllers.auth.registration(req.body, res));
authRouter.post('/update_tokens/', (req, res) => controllers.auth.updateTokens(req.body, res));

let apiRoutes = Router();
apiRoutes.use(checkTokenMiddleware);
apiRoutes.get('/user/:id/', (req, res) => controllers.user.getInfo(req, res));
apiRoutes.get('/user/:id/tasks/', (req, res) => controllers.task.userTasks(req, res));
apiRoutes.post('/task/', (req, res) => controllers.task.addTask(req, res));
apiRoutes.put('/task/:id/', (req, res) => controllers.task.updateTask(req, res));
apiRoutes.delete('/task/:id/', (req, res) => controllers.task.deleteTask(req, res));


router.use('/auth', authRouter);
router.use('/api', apiRoutes);

export default router;