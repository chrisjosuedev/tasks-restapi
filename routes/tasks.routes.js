const { Router } = require('express');
const router = Router();

const { check, query } = require('express-validator');

const {
    getTasks,
    getTaskById,
    postTask,
    updateTask,
    deleteTask,
} = require('../controllers/tasks.controller');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');
const {
    isValidUserCategory,
    isValidUserTask,
} = require('../middlewares/validate-user-info');

// GET Tasks
router.get(
    '/',
    [
        validateJWT,
        query('limit', 'limit must be a number.').isNumeric().optional(),
        query('from', 'from must be a number.').isNumeric().optional(),
        validateFields,
    ],
    getTasks
);

// GET by ID Task
router.get('/:id', [validateJWT, isValidUserTask], getTaskById);

// POST Tasks
router.post(
    '/',
    [
        validateJWT,
        check('title', 'Title task is required').not().isEmpty(),
        check('description', 'Description task is required').not().isEmpty(),
        check('category_id', 'Category Task is required').not().isEmpty(),
        validateFields,
        isValidUserCategory,
    ],
    postTask
);

// PUT Tasks
router.put(
    '/:id',
    [
        validateJWT,
        check('title', 'Title task is required').not().isEmpty(),
        check('description', 'Description task is required').not().isEmpty(),
        check('category_id', 'Category Task is required').not().isEmpty(),
        check('done', 'Task status is required').not().isEmpty(),
        validateFields,
        isValidUserCategory,
        isValidUserTask,
    ],
    updateTask
);

// DELETE Tasks
router.delete('/:id', [validateJWT, isValidUserTask], deleteTask);

module.exports = router;
