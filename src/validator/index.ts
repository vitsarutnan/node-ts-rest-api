import { body, param, query } from "express-validator";

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

    checkGetTodo() {
        return [
            param('id')
                .notEmpty()
                .withMessage('The param "id" should be not empty.')
                .isUUID()
                .withMessage('The param "id" should be UUIDv4.')
        ];
    }

    checkUpdateTodo() {
        return [
            param('id')
                .notEmpty()
                .withMessage('The param "id" should be not empty.')
                .isUUID()
                .withMessage('The param "id" should be UUIDv4.'),
            body('title')
                .notEmpty()
                .withMessage('The "title" value should be not empty.'),
            body('completed')
                .notEmpty()
                .withMessage('The "completed" value should be not empty.')
                .isBoolean()
                .withMessage('The "completed" value should be boolean.')
                .isIn([0, 1, false, true])
                .withMessage('The value should be [0, 1] or [false, true].')

        ];
    }

    checkDeleateTodo() {
        return [
            param('id')
                .notEmpty()
                .withMessage('The param "id" should be not empty.')
                .isUUID()
                .withMessage('The param "id" should be UUIDv4.')
        ];
    }
}

export default new TodoValidator();