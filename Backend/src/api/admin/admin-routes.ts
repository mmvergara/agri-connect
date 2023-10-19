import type { Router } from "express";
import { isAuth } from "../../middleware/isAuth";
import { isAdmin } from "../../middleware/isAdmin";

export default (router: Router) => {
  // router.post("/admin/search/user", isAuth, isAdmin, register);
};
