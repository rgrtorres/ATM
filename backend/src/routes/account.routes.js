import Router from 'express';
import AccountController from '../controllers/AccountController.js';

const router = Router();

router.post('/deposit', AccountController.deposit);
router.post('/withdraw', AccountController.withdraw);
router.get('/:accountId/balance', AccountController.getBalance);
router.get('/balances', AccountController.getAllBalances);

export default router;
