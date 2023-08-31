"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = exports.username = exports.password = exports.email = void 0;
const joi_1 = __importDefault(require("joi"));
exports.email = joi_1.default.string().email().required();
exports.password = joi_1.default.string().min(6).max(100).required();
exports.username = joi_1.default.string().min(3).max(20).required();
exports.message = joi_1.default.string().min(1).max(1000).required();
//# sourceMappingURL=field-schemas.js.map