const { Role } = require('../models');

// Get All Roles

const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();

        res.status(200).json({
            roles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `${error}`,
        });
    }
};

// Post Role
const postRole = async (req, res) => {
    const { role } = req.body;

    try {
        const newRole = {
            role
        };

        const roleCreated = await Role.create(newRole);

        res.status(200).json({
            msg: "Role created successfully",
            roleCreated
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: `${error}`,
        });
    }
};

module.exports = {
    getRoles,
    postRole
};
