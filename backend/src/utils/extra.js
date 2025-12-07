import { memoryDB } from "../db/memoryDB.js";

class ExtraUtils {
    async bankNotesAvailable(amount) {
        const notes = [100, 50, 20, 10];
        const result = {};
        let remainingAmount = amount;

        for (const note of notes) {
            if (remainingAmount >= note) {
                const count = Math.floor(remainingAmount / note);
                if (count > 0) {
                    result[note] = count;
                    remainingAmount -= count * note;
                }
            }
        }

        if (remainingAmount === 0) {
            return true;
        } else {
            const error = new Error('Cannot dispense the requested amount');
            error.details = {
                error: 'Cannot dispense the requested amount with available bank notes',
                notesAvailable: notes,
                withdraw: amount
            };
            
            return error;
        }
    }

    async refreshBalance(accountId, type, amount) {
        const userBalance = memoryDB.user.find(user => user.id === parseInt(accountId)).balance;

        if (type === 'deposit') {
            const newBalance = userBalance + amount;
            memoryDB.user.find(user => user.id === parseInt(accountId)).balance = newBalance;
            memoryDB.user.find(user => user.id === parseInt(accountId)).lastUpdated = new Date();
        }

        if (type === 'withdraw') {
            const newBalance = userBalance - amount;
            memoryDB.user.find(user => user.id === parseInt(accountId)).balance = newBalance;
            memoryDB.user.find(user => user.id === parseInt(accountId)).lastUpdated = new Date();
        }

        return true;
    }
}

export default new ExtraUtils();