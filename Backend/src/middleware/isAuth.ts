import { Next, Req } from "../types/express-types";

export const isAuth = (req: Req, _, next: Next) => {
  if (!req.session.isLoggedIn)
    throw new Error("Session Expired! Try loggin in again");
  next();
};
