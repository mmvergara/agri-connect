import { getUserByUsername } from "./user-services";
import { Req, Res } from "../types/express-types";

export const searchUsers = async (req: Req, res: Res) => {
  try {
    const { username } = req.query as { username: string };
    const users = await getUserByUsername(username as string);
    return res.status(200).json({ data: users, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};



