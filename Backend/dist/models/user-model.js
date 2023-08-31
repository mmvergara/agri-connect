"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: { type: String, required: true },
    username: { type: String, required: true },
    verified: { type: Boolean, default: false },
    role: { type: String, default: "user" },
});
exports.UserModel = mongoose_1.models.User || (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user-model.js.map