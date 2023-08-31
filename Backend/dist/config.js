"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MORGAN = exports.MONGODB_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (!envFound)
    throw new Error("Couldn't find .env file");
if (!process.env.MONGODB_URL)
    throw new Error("MONGODB_URL ENV is not defined");
exports.PORT = process.env.PORT || 3000;
exports.MONGODB_URL = process.env.MONGODB_URL;
exports.MORGAN = process.env.MORGAN || "";
//# sourceMappingURL=config.js.map