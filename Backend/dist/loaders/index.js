"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_loader_1 = __importDefault(require("./express-loader"));
const mongodb_loader_1 = __importDefault(require("./mongodb-loader"));
const MainLoader = async ({ app }) => {
    console.log("= = = Loading Loaders...");
    await (0, express_loader_1.default)({ app });
    await (0, mongodb_loader_1.default)();
    console.log("= = = Loaders Loaded");
};
exports.default = MainLoader;
//# sourceMappingURL=index.js.map