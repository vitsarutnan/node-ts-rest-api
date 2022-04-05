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

app.get(
    '/todos/:id',
    TodoValidator.checkGetTodo(),
    Middleware.hadleValidationError,
    async (req: Req, res: Res) => {
        try {
            const { id } = req.params;
            const record = await Todoinstance.findOne({ where: { id } });
            return res.json(record);
        } catch {
            res.status(500).json({ msg: 'fail to get todo with id.', status: 500, route: 'METHOD GET /todos/:id' });
        }
    }
);

app.put(
    '/todos/:id',
    TodoValidator.checkUpdateTodo(),
    Middleware.hadleValidationError,
    async (req: Req, res: Res) => {
        try {
            const { id } = req.params;
            const { title, completed } = req.body;
            const record = await Todoinstance.findOne({ where: { id } });

            if (!record) {
                return res.json({ msg: 'Can not find existing record.' });
            }

            const updatedRecord = await record.update({ title, completed });
            return res.json({ record: updatedRecord });

        } catch {
            res.status(500).json({ msg: 'fail to update todo.', status: 500, route: 'METHOD PUT /todos/:id' });
        }
    }
);

app.delete(
    '/todos/:id',
    TodoValidator.checkDeleateTodo(),
    Middleware.hadleValidationError,
    async (req: Req, res: Res) => {
        try {
            const { id } = req.params;
            const record = await Todoinstance.findOne({ where: { id } });

            if (!record) {
                return res.json({ msg: 'Can not find existing record.' });
            }

            const deletedRecord = await record.destroy();
            return res.json({ record: deletedRecord });
        } catch {
            res.status(500).json({ msg: 'fail to delete todo.', status: 500, route: 'METHOD DELETE /todos/:id' });
        }
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});