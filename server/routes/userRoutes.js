import express from "express";
import UserController from "../controllers/userController";
import { adminRole } from "../middleware/permissions";

const API_VERSION = "/api/v1";

const router = express.Router();

router.post(`${API_VERSION}/auth/signup`,   UserController.signup);
router.post(`${API_VERSION}/user/admin/signup`, adminRole, UserController.signup)
router.post(`${API_VERSION }/auth/signin`, UserController.signIn)

export default router;
