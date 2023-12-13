import mongoose, { Document } from 'mongoose';

export type Line = {
  points: { x1: number; y1: number; x2: number; y2: number };
  color: string;
  thickness: number;
};

export type Shape = {
  type: string;
  position: { x: number; y: number };
  width?: number;
  height?: number;
  color: string;
};

export type TextAnnotation = {
  content: string;
  position: { x: number; y: number };
  fontSize: number;
  color: string;
};

export type Drawing = {
  title: string;
  lines: mongoose.Types.ObjectId[];
  shapes: mongoose.Types.ObjectId[];
  textAnnotations: mongoose.Types.ObjectId[];
};

export type DrawingDocument = Record<string, unknown> & Drawing & Document;
