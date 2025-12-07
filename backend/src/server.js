import express from 'express';
import accountRoutes from './routes/account.routes.js';
import { memoryDB } from './db/memoryDB.js';
import { faker } from '@faker-js/faker';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/account', accountRoutes);

for(let i = 1; i <= 5; i++) {
    memoryDB.user.push({ id: i, name: faker.person.fullName(), balance: 0 });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});