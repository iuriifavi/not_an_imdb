import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(json());

//start Express server on defined port
app.listen(port);

//log to console to let us know it's working
console.log('Server started at port: ' + port);