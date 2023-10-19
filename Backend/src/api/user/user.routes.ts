import type { Router } from "express";
import { getUserProfile } from "./user-controller";

export default (router: Router) => {
  router.get("/user/:username", getUserProfile);
};
