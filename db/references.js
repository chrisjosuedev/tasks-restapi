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

// User --> Category (1 : N)
User.hasMany(Category, {
    foreignKey: 'user_id',
    sourceKey: 'id'
})

Category.belongsTo(User, {
    foreignKey: 'user_id',
    targetId: 'id'
})

// Category --> Task (1 : 1)
Category.hasOne(Task, {
    foreignKey: 'category_id',
    sourceKey: 'id'
})

Task.belongsTo(Category, {
    foreignKey: 'category_id',
    targetId: 'id'
})

// User --> Tasks (1 : N)
User.hasMany(Task, {
    foreignKey: 'user_id',
    sourceKey: 'id'
})

Task.belongsTo(User, {
    foreignKey: 'user_id',
    targetId: 'id'
})