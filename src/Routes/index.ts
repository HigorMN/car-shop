import { Router } from 'express';
import carRoutes from './Car.Routes';
import motorcycleRoutes from './Motorcycle.Routes';

const routes = Router();

routes.use(carRoutes);
routes.use(motorcycleRoutes);

export default routes;