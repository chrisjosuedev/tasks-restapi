const { Router } = require('express');
const router = Router();

const { check, query } = require('express-validator');

const {
    getCategories,
    postCategories,
    deleteCategory,
    updateCategory
} = require('../controllers/categories.controller');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');
const { existsCategoryId } = require('../helpers/db-validators');

// GET Categories
/**
 * Logged Users only.
 * Query by /categories?limit=20&from=0
 */

router.get(
    '/',
    [
        validateJWT,
        query('limit', 'limit must be a number.').isNumeric().optional(),
        query('from', 'from must be a number.').isNumeric().optional(),
        validateFields,
    ],
    getCategories
);

// POST Categories

router.post(
    '/',
    [
        validateJWT,
        check('name', 'Category name is required').not().isEmpty(),
        validateFields,
    ],
    postCategories
);

// PUT Categories
/**
 * Logged Categories only.
 */

router.put(
    '/:id',
    [validateJWT, check('id').custom(existsCategoryId), validateFields],
    updateCategory
);

// DELETE Categories
/**
 * Logged Categories only.
 */

router.delete(
    '/:id',
    [validateJWT, check('id').custom(existsCategoryId), validateFields],
    deleteCategory
);

module.exports = router;
