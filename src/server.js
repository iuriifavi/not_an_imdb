import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import indexRouter from './routes';
import { connectAndSync } from './db';

connectAndSync();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(json());
app.use(indexRouter);

//start Express server on defined port
app.listen(port);

//log to console to let us know it's working
console.log('Server started at port: ' + port);