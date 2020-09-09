import express from "express";
import TransactionController from "../controllers/transactionController";
import verify from '../middleware/authentication'
import { staffRole } from "../middleware/permissions";

const API_VERSION = "/api/v1";

const router = express.Router();

router.post(`${API_VERSION}/transaction/:accountNumber/credit`, verify, staffRole,  TransactionController.creditAccount);
router.post(`${API_VERSION}/transaction/:accountNumber/debit`, verify, staffRole,  TransactionController.debitAccount)
router.get(`${API_VERSION}/transactions/:id/`, verify, TransactionController.getATransaction)


export default router;