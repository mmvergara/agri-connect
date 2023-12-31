import {
  changePassword,
  checkIfEmailExists,
  checkIfUsernameExists,
  createUser,
  validatePassword,
} from "./auth-services";
import {
  ValidateLoginFields,
  ValidateNewPassword,
  ValidateRegisterFields,
} from "../../validators/auth-validators";
import { Req, Res } from "../../types/express-types";
import {
  ChangePasswordFields,
  LoggedInUserData,
  PostChangePasswordResponse,
  PostLoginDataResponse,
  PostLogoutDataResponse,
  PostRegisterDataResponse,
} from "../../shared-types";
import {
  deleteUserByID,
  getUserByEmail,
  getUserByID,
} from "../user/user-services";

export const postRegister = async (req: Req, res: Res) => {
  try {
    const RegisterValues = await ValidateRegisterFields(req.body);

    const existingUser = await checkIfEmailExists(RegisterValues.email);
    if (existingUser != 0) throw new Error("User already exists");

    const sameUsername = await checkIfUsernameExists(RegisterValues.username);
    if (sameUsername != 0) throw new Error("Username already exists");

    await createUser(RegisterValues);
    const data: PostRegisterDataResponse = null;
    return res.status(201).json({ data, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};

export const postLogin = async (req: Req, res: Res) => {
  try {
    const values = await ValidateLoginFields(req.body);
    const { email, password } = values;

    const user = await getUserByEmail(email);
    if (!user) throw new Error("User does not exist");

    await validatePassword(password, user.password);

    // Save user data to session
    req.session.isLoggedIn = true;
    req.session.user_id = user.userID;
    req.session.isAdmin = user.isAdmin;

    const LoggedInUserData: LoggedInUserData = {
      id: user.userID,
      username: user.username,
      avatarUrl: user.avatarUrl,
      isAdmin: user.isAdmin,
      token_expiration: new Date(req.session.cookie.expires),
    };
    const data: PostLoginDataResponse = LoggedInUserData;
    return res.status(200).send({ data, error: null });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message, data: null });
  }
};

export const postLogout = async (req: Req, res: Res) => {
  try {
    req.session.destroy((err) => {
      console.log("User logged out");
    });
    const data: PostLogoutDataResponse = null;
    return res.status(200).json({ data, error: null });
  } catch (error) {
    return res.status(400).json({ error: error.message, data: null });
  }
};

export const postChangePassword = async (req: Req, res: Res) => {
  try {
    let { oldPassword, newPassword } = req.body as ChangePasswordFields;
    const user = await getUserByID(req.session.user_id);
    if (!user) throw new Error("User does not exist");

    // Validate old password
    await validatePassword(oldPassword, user.password);

    // Validate new password
    newPassword = await ValidateNewPassword({ newPassword });

    // Change password
    await changePassword(user.userID, newPassword);

    const data: PostChangePasswordResponse = null;
    return res.status(200).json({ data, error: null });
  } catch (error) {
    return res.status(400).json({ error: error.message, data: null });
  }
};

export const postDeleteAccount = async (req: Req, res: Res) => {
  try {
    const user = await getUserByID(req.session.user_id);
    if (!user) throw new Error("User does not exist");

    // Validate old password
    await validatePassword(req.body.password, user.password);

    // Delete user
    deleteUserByID(user.userID);

    // Logout user
    req.session.destroy((err) => {
      console.log("User logged out");
    });

    const data: PostChangePasswordResponse = null;
    return res.status(200).json({ data, error: null });
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
