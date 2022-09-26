const { User, Role, Category, Task } = require('../models');

// Role --> User (1 : 1)
Role.hasOne(User, {
    foreignKey: 'role_id',
    sourceKey: 'id'
})

User.belongsTo(Role, {
    foreignKey: 'role_id',
    targetId: 'id'
})