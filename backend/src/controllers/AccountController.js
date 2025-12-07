// controllers/AccountController.js
import AccountService from '../services/AccountService.js';

class AccountController {
    async deposit(req, res) {
        try {
            const { accountId } = req.body;
            const { amount } = req.body;

            if (!accountId || !amount) {
                throw new Error('accountId, amount and method are required');
            }

            const result = await AccountService.deposit(accountId, amount);
            return res.json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async withdraw(req, res) {
        try {
            const { accountId } = req.body;
            const { amount } = req.body;
            const { method } = req.body;

            if (!accountId || !amount || !method) {
                throw new Error('accountId, amount and method are required');
            }

            if(method !== 'ATM' && method !== 'digital') {
                throw new Error('Invalid withdrawal method');
            }

            const result = await AccountService.withdraw(accountId, amount, method);
            return res.json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async getBalance(req, res) {
        try {
            const { accountId } = req.params;

            const result = await AccountService.getBalance(accountId);
            return res.json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async getAllBalances(req, res) {
        try {
            const result = await AccountService.getAllBalances();
            return res.json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export default new AccountController();
