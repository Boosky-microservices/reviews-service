import reviewRoutes from './reviews-routes';
import { Router } from 'express';
import { checkJwt } from '../config/auth.config';

const routes = Router();
routes.use('/review', reviewRoutes);

export default routes;
