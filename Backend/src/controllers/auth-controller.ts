import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { createUser, validatePassword } from "../services/auth-service";
import {
  ValidateLoginFields,
  ValidateRegisterFields,
} from "../validators/auth-validators";
import { getUserByEmail } from "../services/user-services";

export const register = async (req: Request, res: Response) => {
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

export const login = async (req: Request, res: Response) => {
  try {
    const values = await ValidateLoginFields(req.body);
    const { email, password } = values;

    const user = await getUserByEmail(email);
    if (!user) throw new Error("User does not exist");

    await validatePassword(password, user.password);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
