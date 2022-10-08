import { Router } from 'express';
import CashFlowRouter from './CashFlows';
import UsuarioRouter from './Usuarios';

const router = Router();

router.use('/cashflow', CashFlowRouter);
router.use('/usuario', UsuarioRouter);

export default router;
