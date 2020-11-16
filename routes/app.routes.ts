import reviewRoutes from './reviews-routes';
import { Router } from 'express';

const routes = Router();
routes.use('/review', reviewRoutes);

export default routes;
