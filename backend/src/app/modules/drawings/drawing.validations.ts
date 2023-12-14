import z from 'zod';

const createDrawingSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255),
    lines: z.array(
      z
        .object({
          points: z.object({
            x1: z.number(),
            y1: z.number(),
            x2: z.number(),
            y2: z.number(),
          }),
          color: z.string(),
          thickness: z.number(),
        })
        .optional()
    ),
    shapes: z
      .array(
        z.object({
          type: z.string(),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          width: z.number().optional(),
          height: z.number().optional(),
          color: z.string(),
        })
      )
      .optional(),
    textAnnotations: z
      .array(
        z.object({
          content: z.string(),
          position: z.object({
            x: z.number(),
            y: z.number(),
          }),
          fontSize: z.number(),
          color: z.string(),
        })
      )
      .optional(),
  }),
});

export const DrawingValidations = {
  createDrawingSchema,
};
