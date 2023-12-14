import mongoose, { Schema } from 'mongoose';
import {
  Drawing,
  DrawingDocument,
  Line,
  Shape,
  TextAnnotation,
} from './drawing.interface';

const LineSchema = new Schema<Line>({
  points: {
    x1: { type: Number, required: true },
    y1: { type: Number, required: true },
    x2: { type: Number, required: true },
    y2: { type: Number, required: true },
  },
  color: { type: String, required: true },
  thickness: { type: Number, required: true },
});

const ShapeSchema = new Schema<Shape>({
  type: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  width: { type: Number, required: false },
  height: { type: Number, required: false },
  color: { type: String, required: true },
});

const TextAnnotationSchema = new Schema<TextAnnotation>({
  content: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  fontSize: { type: Number, required: true },
  color: { type: String, required: true },
});

const DrawingSchema = new Schema<DrawingDocument>({
  title: { type: String, required: true },
  lines: [{ type: Schema.Types.ObjectId, ref: 'Line' }],
  shapes: [{ type: Schema.Types.ObjectId, ref: 'Shape' }],
  textAnnotations: [{ type: Schema.Types.ObjectId, ref: 'TextAnnotation' }],
});

const LineModel = mongoose.model<Line>('Line', LineSchema);
const ShapeModel = mongoose.model<Shape>('Shape', ShapeSchema);
const TextAnnotationModel = mongoose.model<TextAnnotation>(
  'TextAnnotation',
  TextAnnotationSchema
);
const Drawing = mongoose.model<DrawingDocument>('Drawing', DrawingSchema);

export const DrawingModel = {
  Drawing,
  LineModel,
  ShapeModel,
  TextAnnotationModel,
};
