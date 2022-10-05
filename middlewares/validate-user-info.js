const { Category, Task } = require('../models');

const isValidUserCategory = async (req, res, next) => {
    const { category_id } = req.body;
    try {
        const category = await Category.findOne({
            where: {
                id: category_id,
                user_id: req.user.id,
            },
        });

        if (!category) {
            return res.status(400).json({
                msg: `${req.user.username} doesn't have a category with ID ${category_id}`,
            });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: `${error}`,
        });
    }
};

const isValidUserTask = async (req, res, next) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({
            where: {
                id,
                user_id: req.user.id,
            },
        })

        if (!task) {
            return res.status(400).json({
                msg: `${req.user.username} doesn't have a task with ID ${id}`.trim(),
            });
        }

        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: `${error}`,
        });
    }
};

module.exports = {
    isValidUserCategory,
    isValidUserTask
};
