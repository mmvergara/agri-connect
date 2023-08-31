"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateLoginFields = exports.LoginSchema = exports.ValidateRegisterFields = exports.RegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const field_schemas_1 = require("./field-schemas");
exports.RegisterSchema = joi_1.default.object({
    email: field_schemas_1.email,
    password: field_schemas_1.password,
    username: field_schemas_1.username,
});
const ValidateRegisterFields = async (body) => {
    try {
        const { error, value } = exports.RegisterSchema.validate(body);
        if (error)
            throw new Error(error.details[0].message);
        return value;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.ValidateRegisterFields = ValidateRegisterFields;
exports.LoginSchema = joi_1.default.object({
    email: field_schemas_1.email,
    password: field_schemas_1.password,
});
const ValidateLoginFields = async (body) => {
    try {
        const { error, value } = exports.LoginSchema.validate(body);
        if (error)
            throw new Error(error.details[0].message);
        return value;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.ValidateLoginFields = ValidateLoginFields;
//# sourceMappingURL=auth-validators.js.map