import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { searchRoutes } from '../modules/search/search.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const modulesRouters = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/search',
    route: searchRoutes,
  },
];

modulesRouters.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
