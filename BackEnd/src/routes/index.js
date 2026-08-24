import express from "express";

import AuthRoute from "./authRouter.js";
import EmployeeRoute from "./employeeRoutes.js";

const router = express.Router();

const routes = [
    {
        path: "/auth",
        router: AuthRoute
    },
    {
        path: "/employee",
        router: EmployeeRoute
    }
];

routes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;