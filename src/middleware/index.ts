import { Request as Req, Response as Res, NextFunction as NextFuc } from 'express';
import { validationResult } from 'express-validator';

class Middleware {
    hadleValidationError(req: Req, res: Res, next: NextFuc) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.json(error);
        }

        next();
    }
}

export default new Middleware();