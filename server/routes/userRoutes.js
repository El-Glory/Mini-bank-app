import express from "express";
import UserController from "../controllers/userController";
import { adminRole, adminStaffRole, staffRole } from "../middleware/permissions";
import verify from '../middleware/authentication'
const API_VERSION = "/api/v1";

const router = express.Router();

router.post(`${API_VERSION}/auth/signup`,   UserController.signup);
router.post(`${API_VERSION}/user/admin/signup`, adminRole, UserController.signup)
router.post(`${API_VERSION }/auth/signin`, UserController.signIn)
router.get(`${API_VERSION}/user/:email/accounts`,verify, adminStaffRole, UserController.getAccounts)

export default router;
