import express from 'express';

import actorsRouter from './actors';

const apiRouter = express.Router();

apiRouter.use('/actor', actorsRouter);

export default apiRouter;