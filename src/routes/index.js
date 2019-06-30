import express from 'express';

import apiRouter from './api';

const indexRouter = express.Router();

indexRouter.use('/api', apiRouter);
indexRouter.use('/static', express.static('frontend'));
indexRouter.use('/*', express.static('frontend'));

export default indexRouter;