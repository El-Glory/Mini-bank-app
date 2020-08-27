import express from 'express';
import userRoutes from './userRoutes';
import accountRoutes from './accountRoutes';
import transactionRoutes from './transactionRoutes'

const router = express.Router();

router.use('/', userRoutes, accountRoutes, transactionRoutes )

export default router