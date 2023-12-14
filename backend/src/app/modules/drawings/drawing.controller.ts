import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { DrawingService } from './drawing.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createDrawing = catchAsync(async (req: Request, res: Response) => {
  const result = await DrawingService.createDrawing(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Drawing created successfully',
    data: result,
  });
});

const getAllDrawings = catchAsync(async (req: Request, res: Response) => {
  const result = await DrawingService.getAllDrawings();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All drawings fetched successfully',
    data: result,
  });
});

const getDrawingById = catchAsync(async (req: Request, res: Response) => {
  const result = await DrawingService.getDrawingbyId(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Drawing fetched successfully',
    data: result,
  });
});

const updateDrawing = catchAsync(async (req: Request, res: Response) => {
  const result = await DrawingService.updateDrawing(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Drawing updated successfully',
    data: result,
  });
});

const deleteDrawing = catchAsync(async (req: Request, res: Response) => {
  const result = await DrawingService.deleteDrawing(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Drawing deleted successfully',
    data: result,
  });
});

export const DrawingController = {
    createDrawing,
    getAllDrawings,
    getDrawingById,
    updateDrawing,
    deleteDrawing,
}
