import { createUser, validatePassword } from "../services/auth-service";
import {
  ValidateLoginFields,
  ValidateRegisterFields,
} from "../validators/auth-validators";
import { getUserByEmail } from "../services/user-services";
import { Req, Res } from "../types/express-types";

export const register = async (req: Req, res: Res) => {
  try {
    const RegisterValues = await ValidateRegisterFields(req.body);

    const existingUser = await getUserByEmail(RegisterValues.email);
    if (existingUser) throw new Error("User already exists");

    const newUser = await createUser(RegisterValues);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Req, res: Res) => {
  try {
    const values = await ValidateLoginFields(req.body);
    const { email, password } = values;

    const user = await getUserByEmail(email);
    if (!user) throw new Error("User does not exist");

    await validatePassword(password, user.password);

    req.session.isLoggedIn = true;
    req.session.userId = user._id;
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

export const logout = async (req: Req, res: Res) => {
  try {
    req.session.destroy();
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};