const { Category, User } = require('../models');

// GET Categories
const getCategories = async (req, res) => {
    const { limit, from } = req.query;

    try {
        const [totalCategories, categories] = await Promise.all([
            Category.count({ where: { status: true, user_id: req.user.id } }),
            Category.findAll({
                offset: from,
                limit,
                where: { status: true, user_id: req.user.id },
            }),
        ]);

        res.status(200).json({
            totalCategories,
            categories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `${error}`,
        });
    }
};

// POST Categories
const postCategories = async (req, res) => {
    const { name } = req.body;

    try {
        /** Verify if already Exists */
        const category = await Category.findOne({
            where: { name, user_id: req.user.id, status: true },
        });

        if (category) {
            return res.status(400).json({
                msg: `${category.name} Category is already registered.`,
            });
        }

        const newCategory = {
            name,
            user_id: req.user.id,
        };

        const categoryCreated = await Category.create(newCategory);

        return res.status(201).json({
            msg: 'Category created successfully',
            categoryCreated,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: `${error}`,
        });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const name = req.body.name.toLowerCase();

    try {
        // Update if Category belong to Req.user.id
        const category = await Category.findOne({
            where: { id, user_id: req.user.id, status: true },
        });

        if (!category) {
            return res.status(400).json({
                msg: `You don't have a category with ID ${id}.`,
            });
        }

        // Verify if exists a Category with Same Name
        const userCategory = await Category.findOne({
            where: {
                name: Category.sequelize.where(
                    Category.sequelize.fn('LOWER', Category.sequelize.col('name')),
                    'LIKE',
                    '%' + name + '%'
                ),
                user_id: req.user.id,
            },
        });

        if (userCategory) {
            return res.status(400).json({
                msg: `${userCategory.name} Category is already registered.`,
            });
        }

        await Category.update(
            {
                name,
            },
            { where: { id } }
        );

        return res.status(200).json({
            msg: 'Category updated successfully.',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: `${error}`,
        });
    }
};

// DELETE Category
const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete if Category belong to Req.user.id
        const category = await Category.findOne({
            where: { id, user_id: req.user.id, status: true },
        });

        if (!category) {
            return res.status(400).json({
                msg: `You don't have a category with ID ${id}.`,
            });
        }

        await Category.update(
            {
                status: false,
            },
            { where: { id } }
        );

        return res.status(200).json({
            msg: 'Category removed successfully.',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: `${error}`,
        });
    }
};

module.exports = {
    getCategories,
    postCategories,
    deleteCategory,
    updateCategory,
};
