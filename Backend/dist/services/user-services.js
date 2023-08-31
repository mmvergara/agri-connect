"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmail = exports.getUsers = void 0;
const user_model_1 = require("../models/user-model");
const getUsers = async () => {
    try {
        const users = await user_model_1.UserModel.find();
        return users;
    }
    catch (error) {
        throw error;
    }
};
exports.getUsers = getUsers;
const getUserByEmail = async (email) => {
    try {
        const user = await user_model_1.UserModel.findOne({ email });
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.getUserByEmail = getUserByEmail;
const getUserById = async (id) => {
    try {
        const user = await user_model_1.UserModel.findById(id);
        return user;
    }
    catch (error) {
        throw error;
    }
};
exports.getUserById = getUserById;
//# sourceMappingURL=user-services.js.map