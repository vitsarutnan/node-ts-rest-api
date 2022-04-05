import { body, query } from "express-validator";

class TodoValidator {
    checkCreateTodo() {
        return [
            body('id')
                .optional()
                .isUUID()
                .withMessage('The "id" value should be UUIDv4.'),
            body('title')
                .notEmpty()
                .withMessage('The "title" value should be not empty.'),
            body('completed')
                .optional()
                .isBoolean()
                .withMessage('The "completed" value should be boolean.')
                .isIn([0, 1, false, true])
                .withMessage('The value should be [0, 1] or [false, true].')
        ];
    }

    checkGetTodos() {
        return [
            query('limit')
                .notEmpty()
                .withMessage('The query "limit" should be not empty.')
                .isInt({ min: 1 })
                .withMessage('The "limit" value should be number and minimum 1.'),
            query('offset')
                .optional()
                .isNumeric()
                .withMessage('The query "offset" value should be number.')
        ];

    }
}

export default new TodoValidator();