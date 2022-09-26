const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');

const { getRoles, postRole } = require('../controllers/roles.controller');
const { validateFields } = require('../middlewares/validate-fields');

const { roleExists } = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-roles')

// GET Roles
/**
 * Logged Users.
 */
router.get('/', [validateJWT], getRoles);

// POST Roles
/**
 * Users Logged, Register Roles Admin only.
 */
router.post(
    '/',
    [
        validateJWT,
        isAdminRole,
        check('role', 'Role is required').not().isEmpty(),
        check('role').custom(roleExists),
        validateFields,
    ],
    postRole
);

module.exports = router;
