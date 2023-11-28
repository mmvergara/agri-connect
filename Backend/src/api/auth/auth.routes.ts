import {
  postChangePassword,
  postDeleteAccount,
  postLogin,
  postLogout,
  postRegister,
} from "./auth-controller";
import type { Router } from "express";
import { isAuth } from "../../middleware/isAuth";

export default (router: Router) => {
  router.post("/auth/register", postRegister);
  router.post("/auth/login", postLogin);
  router.post("/auth/logout", postLogout);
  router.post("/auth/change-password", isAuth, postChangePassword);
  router.post("/auth/delete-account", isAuth, postDeleteAccount);

  router.get("/", (req, res) => res.send("Hello"));
};
