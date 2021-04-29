import { Router } from 'express';
import MeasurementController from '../controllers/MeasurementController';

const measurementRouter = Router();
const measurementController = new MeasurementController();

measurementRouter.get('/', measurementController.list);

measurementRouter.post('/', measurementController.create);

export default measurementRouter;
