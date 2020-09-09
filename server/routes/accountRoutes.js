import express from "express";
import AccountController from "../controllers/accountController";
import verify from '../middleware/authentication'
import { adminStaffRole } from "../middleware/permissions";
//import { adminRole } from "../middleware/permissions";

const API_VERSION = "/api/v1";

const router = express.Router();

router.post(`${API_VERSION}/accounts`, verify,  AccountController.createAccount);
router.patch(`${API_VERSION}/account/:accountNumber`,verify, adminStaffRole, AccountController.AccountStatus);
router.delete(`${API_VERSION}/accounts/:accountNumber`, verify, adminStaffRole, AccountController.DeleteAccount)
router.get(`${API_VERSION}/accounts/:accountNumber/transactions`, verify, AccountController.getTransactions)

export default router;