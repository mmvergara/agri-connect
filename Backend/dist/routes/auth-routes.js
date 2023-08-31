"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth-controller");
const isAuth_1 = require("../middleware/isAuth");
exports.default = (router) => {
    router.post("/auth/register", auth_controller_1.register);
    router.post("/auth/login", isAuth_1.isAuth, auth_controller_1.login);
};
//# sourceMappingURL=auth-routes.js.map