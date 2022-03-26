import express, { Request as Req, Response as Res } from 'express';
import db from './config/database.config';

db.sync().then(() => {
    console.log(`Connect to DB`);
});

const app = express();
const port = 3000;

app.get('/', (req: Req, res: Res) => {
    return res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});