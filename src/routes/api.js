import express from 'express';

import actorsRouter from './actors';
import moviesRouter from './movies';

const apiRouter = express.Router();

apiRouter.use('/actor', actorsRouter);
apiRouter.use('/movie', moviesRouter);

export default apiRouter;