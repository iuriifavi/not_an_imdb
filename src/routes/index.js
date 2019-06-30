import express from 'express';

import apiRouter from './api';

const indexRouter = express.Router();

indexRouter.use('/api', apiRouter);

export default indexRouter;