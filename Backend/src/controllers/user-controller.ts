import { GetUserProfileDataResponse, UserProfile } from "../shared-types";
import { Req, Res } from "../types/express-types";
import { getUserProfileByUsername } from "./user-services";

export const getUserProfile = async (req: Req, res: Res) => {
  try {
    const username = req.params.username as string;
    if (!username) throw new Error("Username not provided");
    const data: GetUserProfileDataResponse = await getUserProfileByUsername(
      username
    );
    if (!data) throw new Error("User not found");
    data.password = "";
    data.isAdmin = false;
    return res.status(200).json({ data, error: null });
  } catch (error) {
    return res.status(400).json({ data: null, error: error.message });
  }
};
