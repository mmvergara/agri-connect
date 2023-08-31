"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const MongodbLoader = async () => {
    try {
        mongoose_1.default.connect(config_1.MONGODB_URL);
        mongoose_1.default.connection.on("connected", () => {
            console.log("MongoDB connection established");
        });
        mongoose_1.default.connection.on("error", (err) => {
            console.log("MongoDB connection error: " + err);
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = MongodbLoader;
//# sourceMappingURL=mongodb-loader.js.map