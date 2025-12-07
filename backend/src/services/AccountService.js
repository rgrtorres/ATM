import { memoryDB } from "../db/memoryDB.js";
import ExtraUtils from "../utils/extra.js";

class AccountService {
    async deposit(accountId, amount) {
        try {
            memoryDB.transactions.push({
                accountId, amount,
                type: 'deposit',
                date: new Date()
            });

            await ExtraUtils.refreshBalance(accountId, 'deposit', amount);

            return true
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async withdraw(accountId, amount, method) {
        try {
            const userBalance = memoryDB.user.find(user => user.id === parseInt(accountId)).balance;
            if (userBalance < amount) {
                throw new Error('Insufficient funds');
            }

            if(method === 'ATM') {
                const canDispense = await ExtraUtils.bankNotesAvailable(amount);
                if (canDispense !== true) {
                    return canDispense.details
                }
            }

            memoryDB.transactions.push({
                accountId, amount,
                type: 'withdraw',
                method: method,
                date: new Date()
            });

            await ExtraUtils.refreshBalance(accountId, 'withdraw', amount);

            return true
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getBalance(accountId) {
        const user = memoryDB.user.find(user => user.id === parseInt(accountId));
        if (!user) {
            throw new Error('User not found');
        }
        return { id: user.id, name: user.name, balance: user.balance };
    }

    async getAllBalances() {
        const transactions = memoryDB.transactions;
        const userBalances = memoryDB.user.map(user => ({
            ...user,
            transactions: transactions.filter(tx => tx.accountId === user.id),
        }));
        return userBalances
    }
}

export default new AccountService();