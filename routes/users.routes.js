const { Router } = require('express');
const router = Router();

const { check, query } = require('express-validator');

const {
    getUsers,
    postUser,
    deleteUser,
    updateUser,
} = require('../controllers/users.controller');
const { validateFields } = require('../middlewares/validate-fields');

const {
    isValidRole,
    isValidUsername,
    existsUser,
} = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validate-jwt');

// GET Users
/**
 * Logged Users only.
 * Query by /users?limit=20&from=0
 */

router.get(
    '/',
    [
        query('limit', 'limit must be a number.').isNumeric().optional(),
        query('from', 'from must be a number.').isNumeric().optional(),
        validateJWT,
    ],
    getUsers
);

// POST Users

router.post(
    '/',
    [
        check('fullName', 'Name is required').not().isEmpty(),
        check(
            'username',
            'Username must have at least 8 characters and 16 max.'
        )
            .trim()
            .isLength({
                min: 8,
                max: 16,
            })
            .isAlphanumeric()
            .withMessage('Username must be Alphanumeric.'),
        check('password', 'Password must have at least 8 characters').isLength({
            min: 8,
        }),
        check('username').custom(isValidUsername),
        check('role_id').custom(isValidRole),
        validateFields,
    ],
    postUser
);

// PUT Users
/**
 * Logged Users only.
 */

router.put(
    '/:id',
    [
        validateJWT,
        check('id').custom(existsUser),
        check('role_id').custom(isValidRole),
        validateFields,
    ],
    updateUser
);

// DELETE Users
/**
 * Logged Users only.
 */

router.delete(
    '/:id',
    [validateJWT, check('id').custom(existsUser), validateFields],
    deleteUser
);

module.exports = router;
