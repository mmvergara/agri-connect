import { Next, Req, Res } from "../types/express-types";

export const isAuth = (req: Req, res: Res, next: Next) => {
  if (!req.session.isLoggedIn) {
    res.status(401).json({ error: "User not authenticated", data: null });
    return;
  }
  next();
};
