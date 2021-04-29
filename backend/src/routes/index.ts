import { Router } from 'express';
import measurementRouter from './measurements.routes';

const routes = Router();

routes.use('/measurement', measurementRouter);

export default routes;
