import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { DrawingValidations } from './drawing.validations';
import { DrawingController } from './drawing.controller';
const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(DrawingValidations.createDrawingSchema),
    DrawingController.createDrawing
  )
  .get(DrawingController.getAllDrawings);

router
  .route('/:id')
  .get(DrawingController.getDrawingById)
  .patch(
    validateRequest(DrawingValidations.createDrawingSchema),
    DrawingController.updateDrawing
  )
  .delete(DrawingController.deleteDrawing);

export const DrawingRoutes = router;
