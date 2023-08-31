"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const isAuth = (req, _, next) => {
    if (!req.session.isLoggedIn)
        throw new Error("Session Expired! Try loggin in again");
    next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map