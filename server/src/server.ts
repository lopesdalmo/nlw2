import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(helmet());
app.disable("X-Powered-By")

app.listen(3333);
