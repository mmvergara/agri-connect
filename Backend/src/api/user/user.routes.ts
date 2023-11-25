import type { Router } from "express";
import { getUserProfile, postEndorseUser } from "./user-controller";

export default (router: Router) => {
  router.get("/user/:username", getUserProfile);

  router.post("/user/endorse", postEndorseUser);
};
