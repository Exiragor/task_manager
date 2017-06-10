import * as express from 'express';
import { crossDomainMiddleware } from './middlewares';
import * as bodyparser from 'body-parser';
import apiRoutes from './routes/api';

let app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(crossDomainMiddleware);

app.use(apiRoutes);

export default app;
