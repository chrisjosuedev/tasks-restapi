const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { signIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');

// Sing In
router.post(
    '/signin',
    [
        check('username', 'Username is Required').not().isEmpty(),
        check('password', 'Password is Required').not().isEmpty(),
        validateFields,
    ],
    signIn
);

module.exports = router;
