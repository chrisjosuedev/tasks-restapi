const isAdminRole = async (req, res, next) => {
    // If users 
    if (!req.user) {
        return res.status(500).json({
            msg: "Attempted to validate role without token verification"
        })
    }

    const { role_id, username } = req.user;

    // role_id ADMIN_ROLE = 2 in DB
    if (role_id !== 2) {
        return res.status(401).json({
            msg: `${username} is not an admin, You don't have permissions to complete this action.`
        })
    }

    next();
}

module.exports = {
    isAdminRole
}