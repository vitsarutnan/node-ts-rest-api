import { body } from "express-validator";

class TodoValidator {
    checkCreateTodo() {
        return [
            body('id')
                .optional()
                .isUUID()
                .withMessage('The id value should be UUIDv4.'),
            body('title')
                .notEmpty()
                .withMessage('The title value should not be empty.'),
            body('completed')
                .optional()
                .isBoolean()
                .withMessage('The completed value should be boolean.')
                .isIn([0, 1, false, true])
                .withMessage('The value should be [0, 1] or [false, true].')
        ];
    }
}

export default new TodoValidator();