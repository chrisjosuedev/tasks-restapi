const jwt = require('jsonwebtoken');

const { User } = require('../models');

const validateJWT = async (req, res, next) => {
    const token = req.header('x-api-key');

    if (!token) {
        return res.status(401).json({
            msg: 'Unauthorized',
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);

        // User info
        const user = await User.findByPk(id);

        // User doesn't exists
        if (!user) {
            return res.status(401).json({
                msg: "User doesn't exists",
            });
        }

        // Verify uid.status = true
        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid Token',
            });
        }

        req.user = user;

        return next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid Token',
        });
    }
};

module.exports = {
    validateJWT,
};
