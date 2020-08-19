import express from "express";
import AccountController from "../controllers/accountController";
import verify from '../middleware/authentication'
//import { adminRole } from "../middleware/permissions";

const API_VERSION = "/api/v1";

const router = express.Router();

router.post(`${API_VERSION}/accounts`, verify,  AccountController.createAccount);
router.patch(`${API_VERSION}/account/:accountNumber`,verify, AccountController.AccountStatus)

export default router;