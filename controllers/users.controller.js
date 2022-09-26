const bcryptjs = require('bcryptjs');
const { User, Role } = require('../models');

// Get All Users
// TODO: Query by /users?limit=20&from=0

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: {
                model: Role,
                attributes: ['role'],
            },
            attributes: { exclude: ['role_id'] },
            where: { status: true },
        });

        const totalUsers = await User.count({
            where: {
                status: true,
            },
        });

        res.status(200).json({
            totalUsers,
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `${error}`,
        });
    }
};

// Post User
const postUser = async (req, res) => {
    const { fullName, username, password, role_id } = req.body;

    try {
        const user = {
            fullName,
            username,
            password,
            role_id,
        };

        // Crypt Password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        const userCreated = await User.create(user);

        res.status(201).json({
            msg: 'User created successfully',
            userCreated,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `${error}`,
        });
    }
};

// Update User
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { password, username, status, ...rest } = req.body;

    try {
        // Find User by PK
        const user = await User.findByPk(id);

        // Update Password if User sent a new one
        if (password) {
            // Crypt Password
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(password, salt);
        }

        // Update
        const userUpdated = await user.update(rest);

        res.status(200).json({
            msg: 'User updated successfully',
            userUpdated,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `${error}`,
        });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.update(
            {
                status: false,
            },
            {
                where: {
                    id,
                },
            }
        );

        res.status(200).json({
            msg: 'User removed successfully.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `${error}`,
        });
    }
};

module.exports = {
    getUsers,
    postUser,
    deleteUser,
    updateUser,
};
