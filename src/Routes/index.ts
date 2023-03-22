import { Router } from 'express';
import carRoutes from './Car.Routes';

const routes = Router();

routes.use(carRoutes);

export default routes;