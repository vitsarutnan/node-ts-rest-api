import express, { NextFunction as NextFuc, Request as Req, Response as Res } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';

import db from './config/database.config';
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
    (req: Req, res: Res, next: NextFuc) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.json(error);
        }

        next();
    },
    async (req: Req, res: Res) => {
        try {
            const id = uuidv4();
            const { title, completed } = req.body;
            const record = await Todoinstance.create({ id, title, completed });
            return res.json({ record, msg: 'Successfully create todo.' });
        } catch {
            res.status(500).json({ msg: 'fail to create', status: 500, route: '/create' });
        }
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});