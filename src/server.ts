import express, { Request as Req, Response as Res } from "express";

const app = express();
const port = 3000;

app.get('/', (req: Req, res: Res) => {
    return res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});