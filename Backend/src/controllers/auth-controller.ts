import { createUser, validatePassword } from "../services/auth-service";
import {
  ValidateLoginFields,
  ValidateRegisterFields,
} from "../validators/auth-validators";
import { getUserByEmail } from "../services/user-services";
import { Req, Res } from "../types/express-types";
import { UserData } from "../shared-types/auth-types";

export const register = async (req: Req, res: Res) => {
  try {
    const RegisterValues = await ValidateRegisterFields(req.body);

    const existingUser = await getUserByEmail(RegisterValues.email);
    if (existingUser) throw new Error("User already exists");

    await createUser(RegisterValues);
    return res.status(201).json({ data: null, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const login = async (req: Req, res: Res) => {
  try {
    const values = await ValidateLoginFields(req.body);
    const { email, password } = values;

    const user = await getUserByEmail(email);
    if (!user) throw new Error("User does not exist");
    console.log(user.password, password);
    await validatePassword(password, user.password);

    req.session.isLoggedIn = true;
    const UserData: UserData = {
      id: user._id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      token_expiration: new Date(req.session.cookie.expires),
    };
    console.log(UserData.token_expiration);
    return res.status(200).send({ data: UserData, error: null });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message, data: null });
  }
};

export const logout = async (req: Req, res: Res) => {
  try {
    console.log(req.session);
    req.session.destroy((err) => {
      console.log(err);
      console.log("User logged out");
    });
    return res.status(200).json({ data: null, error: null });
  } catch (error) {
    return res.status(400).json({ error: error.message, data: null });
  }
};

export const dataTemp = async (req: Req, res: Res) => {
  try {
    return res.status(200).json({ data: req.session, error: null });
  } catch (error) {
    return res.status(400).json({ error: error.message, data: null });
  }
};
