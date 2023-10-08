import type { Router } from "express";
import { getUserProfile } from "../controllers/user-controller";

export default (router: Router) => {
  router.get("/user/:username", getUserProfile);
};
