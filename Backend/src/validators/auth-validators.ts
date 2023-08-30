import Joi from "joi";
import { email, password, username } from "./field-schemas";
import { LoginFields, RegisterFields } from "../types/auth-types";

export const RegisterSchema = Joi.object<RegisterFields, true, RegisterFields>({
  email,
  password,
  username,
});

export const ValidateRegisterFields = async (body: any) => {
  try {
    const { error, value } = RegisterSchema.validate(body);
    if (error) throw new Error(error.details[0].message);
    return value as RegisterFields;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const LoginSchema = Joi.object<LoginFields, true, LoginFields>({
  email,
  password,
});

export const ValidateLoginFields = async (body: any) => {
  try {
    const { error, value } = LoginSchema.validate(body);
    if (error) throw new Error(error.details[0].message);
    return value as LoginFields;
  } catch (error) {
    throw new Error(error.message);
  }
};
