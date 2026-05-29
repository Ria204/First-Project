import { Router } from "express";  //Router is a class in express that is used to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app". We can use it to define routes in a separate file and then use it in our main app file. It helps in organizing the routes and keeping the code clean.
import { StudentRoutes } from "../../modules/student/student.route";
import { AuthRoute } from "../../modules/auth/auth.route";
const router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: "/student",
    route: StudentRoutes,
  },
  {
    path: "/auth",
    route: AuthRoute,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
