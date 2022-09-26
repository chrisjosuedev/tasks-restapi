const bcryptjs = require('bcryptjs');

const { User } = require('../models');
const { generateJWT } = require('../helpers/generateJWT');

const signIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({
                msg: 'Incorrect username.',
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: "User doesn't exists.",
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Incorrect password.',
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            msg: 'User logged.',
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Login failed: ${error}`,
        });
    }
};

module.exports = {
    signIn,
};
