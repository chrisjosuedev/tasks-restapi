const { Role, User, Category, Task } = require('../models');

/** Role Validations **/
const isValidRole = async (role = '') => {
    const roleExists = await Role.findByPk(role);
    if (!roleExists) {
        throw new Error(`Role doesn't exists`);
    }
    return true
};

const roleExists = async (role = '') => {
    const roleSent = await Role.findOne({ where: { role } })
    if (roleSent) {
        throw new Error(`Role already exists`);
    }
    return true
}

/** User Validations **/
const isValidUsername = async (username = '') => {
    const usernameExists = await User.findOne({ where: { username } });

    if (usernameExists) {
        throw new Error(`${username} Username has already been registered`);
    }
    return true
};

const existsUser = async (id) => {
    const idExists = await User.findByPk(id);
    if (!idExists) {
        throw new Error(`User doesn't exists`);
    }
    return true
};

// /** Category Validations **/
// const existsCategoryId = async (id) => {
//     const idExistsCategory = await Category.findById(id);

//     if (!idExistsCategory) {
//         throw new Error(`${id} category doesn't exists`);
//     }
//     return true
// };

// const isValidName = async (name = '') => {
//     const category = await Category.findOne({ name: name.toUpperCase() });

//     if (category) {
//         throw new Error(`${category.name} category is already registered`);
//     }
//     return true
// };

// /** Product Validations **/
// const isValidProduct = async (name = '') => {
//     const product = await Product.findOne({ name: name.toUpperCase() });

//     if (product) {
//         throw new Error(`${product.name} product is already registered`);
//     }
//     return true
// };

// const existsProductId = async (id) => {
//     const idExistsProduct = await Product.findById(id);

//     if (!idExistsProduct || !idExistsProduct.status) {
//         throw new Error(`${id} product doesn't exists`);
//     }
//     return true
// };

// /** Allowed Collections **/
// const allowedCollections = (collection = '', listCollections = []) => {
//     if (!listCollections.includes(collection)) {
//         throw new Error(`${collection} is not allowed, ${listCollections}`);
//     }
//     return true
// }

module.exports = {
    isValidRole,
    isValidUsername,
    roleExists,
    existsUser
};
