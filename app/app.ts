import * as express from 'express';
import middleware from './middlewares';
import * as bodyparser from 'body-parser';
import apiRoutes from './routes/api';

let app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(middleware.allowCrossDomain);

app.use(apiRoutes);

export default app;
