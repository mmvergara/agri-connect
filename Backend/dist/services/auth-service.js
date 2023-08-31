"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.createUser = void 0;
const user_model_1 = require("../models/user-model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (user) => {
    try {
        const { email, password, username } = user;
        const newUser = await user_model_1.UserModel.create({
            email,
            password,
            username,
        });
        await newUser.save();
        return newUser;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error creating user");
    }
};
exports.createUser = createUser;
const validatePassword = async (p1, p2) => {
    try {
        await bcrypt_1.default.compare(p1, p2);
    }
    catch (error) {
        console.log(error);
        throw new Error("Invalid Password");
    }
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=auth-service.js.map