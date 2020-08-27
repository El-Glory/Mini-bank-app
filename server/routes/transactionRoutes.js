import express from "express";
import TransactionController from "../controllers/transactionController";
import verify from '../middleware/authentication'
import { staffRole } from "../middleware/permissions";

const API_VERSION = "/api/v1";

const router = express.Router();

router.post(`${API_VERSION}/transaction/:accountNumber/credit`, verify, staffRole,  TransactionController.creditAccount);


export default router;