"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const router_1 = __importDefault(require("../routes/router"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const ExpressLoader = async ({ app }) => {
    app.get("/status", (req, res) => res.sendStatus(200).end());
    app.head("/status", (req, res) => res.sendStatus(200).end());
    app.enable("trust proxy");
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
    }));
    app.use((0, cors_1.default)({
        credentials: true,
    }));
    const store = connect_mongo_1.default.create({
        mongoUrl: config_1.MONGODB_URL,
        collectionName: "sessions",
    });
    app.set("trust proxy", 1);
    app.use((0, express_session_1.default)({
        store,
        secret: "BOGARTYIWASHERE",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        },
    }));
    app.use((0, compression_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)(config_1.MORGAN));
    app.use("/", (0, router_1.default)());
};
exports.default = ExpressLoader;
//# sourceMappingURL=express-loader.js.map