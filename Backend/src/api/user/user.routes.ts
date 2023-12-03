import type { Router } from "express";
import {
  getUserProfile,
  postChangeUserAvatar,
  postEndorseUser,
} from "./user-controller";
import { isAuth } from "../../middleware/isAuth";

export default (router: Router) => {
  router.get("/user/:username", getUserProfile);
  router.post("/user/change-pfp", isAuth, postChangeUserAvatar);
  router.post("/user/endorse", isAuth, postEndorseUser);
};
