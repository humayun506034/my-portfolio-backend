import { Router } from 'express';
import { blogRoutes } from '../modules/blogManagement/blog.route';
import { projectRoutes } from '../modules/projectManagement/project.route';
import { contactRoutes } from '../modules/contactMessageManagement/contact.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/projects',
    route: projectRoutes,
  },
  {
    path: '/message',
    route: contactRoutes,
  },
    {
    path: '/auth',
    route: AuthRoutes,
  },
  
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
