import express from "express";

import EmployeeController from "../controllers/employeeController.js";
import authMiddleware from "../middleware/VerifyToken.js";
const router = express.Router();
router.use(authMiddleware);

router.get("/analytics", EmployeeController. getAnalytics);
router.post("/",EmployeeController. createEmployee);
router.get("/",EmployeeController. getEmployees);
router.get("/:id",EmployeeController. getEmployeeById);
router.put("/:id",EmployeeController. updateEmployee);
router.delete("/:id",EmployeeController. deleteEmployee);

export default router;