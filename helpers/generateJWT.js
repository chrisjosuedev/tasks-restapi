const jwt = require('jsonwebtoken');

const generateJWT = async (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(
            payload,
            process.env.SECRET_PRIVATE_KEY,
            {
                expiresIn: '4h',
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Token generation failed');
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generateJWT,
};
