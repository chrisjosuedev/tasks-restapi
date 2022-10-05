const { Task, Category } = require('../models');

// Get all tasks
const getTasks = async (req, res) => {
    const { limit, from } = req.query;

    try {
        const [totalTasks, tasks] = await Promise.all([
            Task.count({ where: { status: true, user_id: req.user.id } }),
            Task.findAll({
                include: {
                    model: Category,
                    attributes: ['name'],
                },
                offset: from,
                limit,
                where: { status: true, user_id: req.user.id },
                attributes: { exclude: ['user_id', 'status', 'category_id'] },
            }),
        ]);

        res.status(200).json({
            totalTasks,
            tasks,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `${error}`,
        });
    }
};

// Get Task by ID
const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({
            include: {
                model: Category,
                attributes: ['name'],
            },
            where: { id, status: true, user_id: req.user.id },
            attributes: { exclude: ['user_id', 'status', 'category_id'] },
        });

        res.status(200).json({
            task,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `${error}`,
        });
    }
};

// Add new task
const postTask = async (req, res) => {
    const { title, description, category_id } = req.body;
    try {
        const newTask = {
            title,
            description,
            category_id,
            user_id: req.user.id,
        };

        // Verify if exists a Tasks with same name

        const titleTask = await Task.count({
            where: {
                title: Task.sequelize.where(
                    Task.sequelize.fn('LOWER', Task.sequelize.col('title')),
                    'LIKE',
                    '%' + title.toLowerCase() + '%'
                ),
                user_id: req.user.id,
                status: true,
            },
        });

        if (titleTask > 0) {
            newTask.title = `${title} (${titleTask + 1})`;
        }

        const task = await Task.create(newTask);

        return res.status(201).json({
            msg: 'Task created successfully',
            task,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: `${error}`,
        });
    }
};

// Update Task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, category_id, done } = req.body;

    try {
        const newTaskToUpdate = {
            title,
            description,
            category_id,
            done,
        };

        await Task.update(newTaskToUpdate, {
            where: { id },
        });

        const taskUpdated = await Task.findOne({
            where: { id },
            attributes: { exclude: ['user_id', 'status'] },
        });

        return res.status(200).json({
            msg: 'Task updated successfully.',
            taskUpdated,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: `${error}`,
        });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.update({ status: false }, { where: { id } });

        return res.status(200).json({
            msg: 'Task removed successfully.',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: `${error}`,
        });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    postTask,
    updateTask,
    deleteTask,
};
