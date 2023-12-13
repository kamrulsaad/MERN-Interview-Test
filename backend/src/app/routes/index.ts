import express from 'express';
import { DrawingRoutes } from '../modules/drawings/drawing.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/drawings',
    route: DrawingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
