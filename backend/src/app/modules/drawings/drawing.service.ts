import { Drawing } from './drawing.interface';
import { DrawingModel } from './drawing.models';

const createDrawing = async (drawing: Drawing) => {
  const result = await DrawingModel.Drawing.create(drawing);
  return result;
};

const getAllDrawings = async () => {
  const result = await DrawingModel.Drawing.find();
  return result;
};

const getDrawingbyId = async (id: string) => {
  const result = await DrawingModel.Drawing.findById(id)
    .populate('lines')
    .populate('shapes')
    .populate('textAnnotations');

  return result;
};

const updateDrawing = async (id: string, drawing: Drawing) => {
  const result = await DrawingModel.Drawing.findByIdAndUpdate(id, drawing, {
    new: true,
  });

  return result;
};

const deleteDrawing = async (id: string) => {
  const result = await DrawingModel.Drawing.findByIdAndDelete(id);
  return result;
};

export const DrawingService = {
  createDrawing,
  getAllDrawings,
  getDrawingbyId,
  updateDrawing,
  deleteDrawing,
};
