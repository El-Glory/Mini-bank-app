import express from 'express';
import userRoutes from './userRoutes';
import accountRoutes from './accountRoutes'

const router = express.Router();

router.use('/', userRoutes, accountRoutes )

export default router