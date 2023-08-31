"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth-service");
const auth_validators_1 = require("../validators/auth-validators");
const user_services_1 = require("../services/user-services");
const register = async (req, res) => {
    try {
        const RegisterValues = await (0, auth_validators_1.ValidateRegisterFields)(req.body);
        const existingUser = await (0, user_services_1.getUserByEmail)(RegisterValues.email);
        if (existingUser)
            throw new Error("User already exists");
        const newUser = await (0, auth_service_1.createUser)(RegisterValues);
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const values = await (0, auth_validators_1.ValidateLoginFields)(req.body);
        const { email, password } = values;
        const user = await (0, user_services_1.getUserByEmail)(email);
        if (!user)
            throw new Error("User does not exist");
        await (0, auth_service_1.validatePassword)(password, user.password);
        req.session.isLoggedIn = true;
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
};
exports.login = login;
//# sourceMappingURL=auth-controller.js.map