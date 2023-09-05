import { Next, Req, Res } from "../types/express-types";

export const isAdmin = async (req: Req, res: Res, next: Next) => {
  if (!req.session.isAdmin)
    return res.status(401).json({ data: null, error: "Unauthorized" });
  next();
};
