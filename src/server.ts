import express, { NextFunction as NextFuc, Request as Req, Response as Res } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';

import db from './config/database.config';
import Middleware from './middleware/index';
import { Todoinstance } from './model/index';
import TodoValidator from './validator/index';

db.sync().then(() => {
    console.log(`Connect to DB`);
});

const app = express();
const PORT = 3000;

app.use(express.json());

app.post(
    '/todos',
    TodoValidator.checkCreateTodo(),
    Middleware.hadleValidationError,
    async (req: Req, res: Res) => {
        try {
            const id = uuidv4();
            const { title, completed } = req.body;
            const record = await Todoinstance.create({ id, title, completed });
            return res.status(201).json({ record, msg: 'Successfully create todo.' });
        } catch {
            res.status(500).json({ msg: 'fail to create.', status: 500, route: 'METHOD POST /todos' });
        }
    }
);

app.get(
    '/todos',
    TodoValidator.checkGetTodos(),
    Middleware.hadleValidationError,
    async (req: Req, res: Res) => {
        try {
            const limit = req.query?.limit as number | undefined;
            const offset = req.query?.offset as number | undefined;
            const records = await Todoinstance.findAll({ where: {}, limit, offset });
            return res.json(records);

        } catch {
            res.status(500).json({ msg: 'fail to get todos.', status: 500, route: 'METHOD GET /todos' });
        }
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});